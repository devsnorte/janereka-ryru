import { axiosInstance as axios } from 'src/boot/axios'
import { Session } from './SessionManager'

/**
 * Media resources orchestrator singleton. Handles all logic related to
 * media fetching, sorting, validation, posting, updating and deletion
 * for the entire application.
 */
export const MediaManager = (function () {
  function MediaHandler () {
    this.session = Session.getSessionManager()
    this.token = null

    // Data holder for handling media resource data in POST and PUT requests
    this.mediaObject = {}

    // Query parameter defaults for requesting media resources
    this.fetchMediaType = 'todos'
    this.pagTamanho = 1000
    this.pagAtual = 1
    this.lastQuery = ''

    /**
     * Resets the media data holder to an empty object
     */
    this.unmakeMediaObject = () => {
      this.mediaObject = {}
    }

    /**
     * Populates a new media data holder object with necessary data for API
     * requests orchestration. Media data is reset before populating new data.
     */
    this.makeMediaObject = (title, description, tags, mediaFile, mediaType, mediaPath) => {
      this.unmakeMediaObject()

      this.mediaObject = {
        title, description, tags, mediaFile, mediaType, mediaPath: mediaPath || null
      }
    }

    /**
     * Verifies whether the media data holder object is empty, returning a
     * boolean. Used by validation fuctions.
     */
    this.isMediaObjectEmpty = () => {
      if (Object.keys(this.mediaObject).length === 0) return true
      else return false
    }

    /**
     * Refreshes session data through the Session manager singleton and gets
     * user data for making authenticated requests.
     */
    this.refreshToken = () => {
      const sessionData = this.session.getSession()
      this.token = sessionData.token
    }

    /**
     * Validates whether the current user is authenticated. Unauthenticated
     * users throw a SubmissionException.
     */
    this.validateAuthentication = () => {
      if (!this.session.isAuthenticated()) {
        throw new this.SubmissionException('AuthenticationValidationError', 'No user is authenticated.')
      }
    }

    /**
     * Validates whether the media data holder object contains all metadada
     * needed for correct subimission to the API. Missing or invalid data
     * throw a SubmissionException.
     *
     * This validation does not cover the media file or any existion API filepaths,
     * which are instead validated by the `validateForUpload` method.
     */
    this.validateForSubmission = () => {
      if (this.isMediaObjectEmpty()) {
        throw new this.SubmissionException('MediaDataValidationError', 'Media data is empty. Can not submit.')
      }

      if (!this.mediaObject.title) {
        throw new this.SubmissionException('MediaDataValidationError', 'Media title is empty. Can not submit.')
      }

      if (!this.mediaObject.description) {
        throw new this.SubmissionException('MediaDataValidationError', 'Media description is empty. Can not submit.')
      }

      if (!this.mediaObject.mediaType) {
        throw new this.SubmissionException('MediaDataValidationError', 'Media file type was not set. Can not submit.')
      }

      if (!Array.isArray(this.mediaObject.tags)) {
        throw new this.SubmissionException('MediaDataValidationError', 'Media tags are not set as array. Can not submit.')
      } else {
        this.mediaObject.tags.forEach(tag => {
          if (typeof (tag) !== 'string') {
            throw new this.SubmissionException('MediaDataValidationError', 'One of the media tags is not a string. Can not submit.')
          }
        })
      }
    }

    /**
     * Validates whether the media data holder object contains a media
     * file and a media filepath, after calling the metadata validation
     * function. This data is needed specifically for PUT requests and
     * POST request for the media upload endpoint.
     */
    this.validateForUpload = () => {
      this.validateForSubmission()

      if (!this.mediaObject.mediaFile) {
        throw new this.SubmissionException('MediaDataValidationError', 'No media file found. Can not upload.')
      }
      if (!this.mediaObject.mediaPath) {
        throw new this.SubmissionException('MediaDataValidationError', 'No media path found. Can not upload.')
      }
    }

    /**
     * Validates whether the media data holder object contains the
     * bare data needed for DELETE requests, namely the resource's
     * API filepath.
     */
    this.validateForDeletion = () => {
      if (this.isMediaObjectEmpty()) {
        throw new this.SubmissionException('DeletionValidationError', 'Media data is empty. Unable to delete.')
      }

      if (!this.mediaObject.mediaPath) {
        throw new this.SubmissionException('DeletionValidationError', 'No media path found. Unable to delete.')
      }
    }

    /**
     * Handles media resource metadata submission to the API. Calls needed
     * validators and dispatches a POST request to the corresponding API
     * endpoint with the required headers and FormData. Errors upon validation
     * or request dispatching yield a SubmissionException.
     */
    this.handleMediaInfoSubmission = async () => {
      try {
        this.validateAuthentication()
        this.validateForSubmission()

        const infoFormData = new FormData()
        infoFormData.append('titulo', this.mediaObject.title)
        infoFormData.append('descricao', this.mediaObject.description)
        infoFormData.append('tipo', this.mediaObject.mediaType)
        infoFormData.append('tags', this.mediaObject.tags.join(', '))

        const { data } = await axios({
          method: 'post',
          url: '/acervo/midia',
          data: infoFormData,
          headers: { token: this.token, 'Content-Type': 'application/x-www-form-urlencoded' }
        })

        this.mediaObject.mediaPath = data.path
      } catch (error) {
        console.error(error)
        throw new this.SubmissionException('MediaInformationSubmissionError', 'Error during the Media information submission process. If error persists, please contact an administrator.')
      }
    }

    /**
     * Handles the media file upload to the API. Calls needed validators
     * dispatches a POST request to the corresponding API endpoint with
     * the required headers and FormData. Errors upon validation or
     * request dispatching yield a SubmissionException.
     *
     * On the cases where file upload fails after successful submission
     * of its metadata, also calls the deletion handler to clear up
     * previous data.
     */
    this.handleMediaFileSubmission = async () => {
      try {
        this.validateAuthentication()
        this.validateForUpload()

        const fileFormData = new FormData()
        fileFormData.append('arquivo', this.mediaObject.mediaFile)

        await axios({
          method: 'post',
          url: `/acervo/upload/${this.mediaObject.mediaPath}`,
          data: fileFormData,
          headers: { token: this.token }
        })
      } catch (error) {
        this.handleMediaDeletion()
        throw new this.SubmissionException('MediaFileUploadError', 'Error during the file upload. Deletion request dispatched for the corresponding path. If error persists, please contact an administrator.')
      }
    }

    /**
     * Handles the update of media resources in the API. Calls needed
     * validators and dispatches a PUT request to the corresponding API
     * endpoint with the required headers and FormData. Errors upon
     * validation or request dispatching yield a SubmissionException.
     */
    this.handleMediaUpdate = async (fileName) => {
      try {
        this.validateAuthentication()

        const updateInfoFormData = new FormData()
        updateInfoFormData.append('titulo', this.mediaObject.title)
        updateInfoFormData.append('descricao', this.mediaObject.description)
        updateInfoFormData.append('tags', this.mediaObject.tags.join(', '))

        await axios({
          method: 'put',
          url: `/acervo/midia/${this.mediaObject.mediaPath}`,
          data: updateInfoFormData,
          headers: { token: this.token, 'Content-Type': 'application/x-www-form-urlencoded' }
        })
      } catch (error) {
        console.error(error)
        throw new this.SubmissionException('MediaUpdateError', 'Error during the update process. If error persists, please contact an administrator.')
      }
    }

    /**
     * Handles deletion of media resources in the API. Calls needed validators
     * and dispatches a DELETE request to the corresponding API endpoint with
     * the required headers. Errors upon validation or request dispatching yield
     * a SubmissionException.
     */
    this.handleMediaDeletion = async () => {
      try {
        this.validateAuthentication()
        this.validateForDeletion()

        await axios({
          method: 'delete',
          url: `/acervo/midia/${encodeURI(this.mediaObject.mediaPath)}`,
          headers: { token: this.token }
        })
      } catch (error) {
        console.error(error)
        throw new this.SubmissionException('MediaDeletionError', 'Error during the deletion process. If error persists, please contact an administrator.')
      }
    }

    /**
     * Orchestrates requests to submit new media resources to the API.
     * Calls request handlers for the related endpoints and catches any
     * errors during the process.
     */
    this.performMediaCreation = async () => {
      try {
        this.refreshToken()
        await this.handleMediaInfoSubmission()
        await this.handleMediaFileSubmission()
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    }

    /**
     * Orchestrates requests to update existing media resources in the
     * API. Calls request handlers for the related endpoints and catches
     * any errors during the process.
     */
    this.performMediaUpdate = async (fileName) => {
      try {
        this.refreshToken()
        await this.handleMediaUpdate(fileName)
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    }

    /**
     * Orchestrates requests to delete existing media resources in the
     * API. Calls request handlers for the related endpoints and catches
     * any errors during the process.
     */
    this.performMediaDeletion = async () => {
      try {
        this.refreshToken()
        await this.handleMediaDeletion()
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    }

    /**
     * Fetches media files from the API download endpoint. The media
     * file is returned as a Blob object.
     */
    this.performMediaDownload = async (mediaPath) => {
      try {
        this.refreshToken()
        const response = await axios({
          method: 'get',
          url: `/acervo/download/${encodeURIComponent(mediaPath)}`,
          token: this.token,
          responseType: 'blob'
        })
        const url = URL.createObjectURL(response.data)
        return url
      } catch (error) {
        console.error(error)
        return false
      }
    }

    /**
     * Find medias uploaded by a given user, with the given pagination
     * parameters.
     */
    this.getMediasFromUser = async (
      username, pagTamanho = this.pagTamanho, pagAtual = this.pagAtual
    ) => {
      try {
        const { data } = await axios.get(
          `/acervo/find?pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}&creator=${username}`
        )
        return data
      } catch (error) {
        console.error(error)
        return false
      }
    }

    /**
     * Find medias uploaded by a given user with published status, with the
     * given pagination parameters.
     */
    this.getSubimissionsFromUser = async (
      username, pagTamanho = this.pagTamanho, pagAtual = this.pagAtual
    ) => {
      try {
        const { data } = await axios.get(
          `/acervo/find?pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}&creator=${username}&status=published`
        )
        return data
      } catch (error) {
        console.error(error)
        return false
      }
    }

    /**
     * Find medias with a given hashtag and pagination paremeters.
     * The resulting query string is stored for potential reuse
     * with sorting parameters.
     */
    this.getMediasByHashtag = async (hashtag, pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      try {
        const query = `/acervo/find?hashtags=${hashtag}&pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
        const { data } = await axios.get(query)
        this.lastQuery = query

        return data
      } catch (error) {
        console.log(error)
        this.lastQuery = ''
        return false
      }
    }

    /**
     * Find medias using given keywords and pagination paremeters.
     * The resulting query string is stored for potential reuse
     * with sorting parameters.
     */
    this.getMediasByKeywords = async (keywords, pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      try {
        const query = `/acervo/find?keywords=${keywords}&pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
        const { data } = await axios.get(query)
        this.lastQuery = query

        return data
      } catch (error) {
        console.log(error)
        this.lastQuery = ''
        return false
      }
    }

    /**
     * Find audio medias with the given pagination paremeters.
     * The resulting query string is stored for potential reuse
     * with sorting parameters.
     */
    this.getAudioMedias = async (pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      try {
        const query = `/acervo/find?tipos=audio&pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
        const { data } = await axios.get(query)
        this.lastQuery = query

        return data
      } catch (error) {
        console.error(error)
        this.lastQuery = ''
        return false
      }
    }

    /**
     * Find file medias with the given pagination paremeters.
     * The resulting query string is stored for potential reuse
     * with sorting parameters.
     */
    this.getFileMedias = async (pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      try {
        const query = `/acervo/find?tipos=arquivo&pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
        const { data } = await axios.get(query)
        this.lastQuery = query

        return data
      } catch (error) {
        console.error(error)
        this.lastQuery = ''
        return false
      }
    }

    /**
     * Find image medias with the given pagination paremeters.
     * The resulting query string is stored for potential reuse
     * with sorting parameters.
     */
    this.getImageMedias = async (pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      try {
        const query = `/acervo/find?tipos=imagem&pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
        const { data } = await axios.get(query)
        this.lastQuery = query

        return data
      } catch (error) {
        console.error(error)
        this.lastQuery = ''
        return false
      }
    }

    /**
     * Find video medias with the given pagination paremeters.
     * The resulting query string is stored for potential reuse
     * with sorting parameters.
     */
    this.getVideoMedias = async (pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      try {
        const query = `/acervo/find?tipos=video&pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
        const { data } = await axios.get(query)
        this.lastQuery = query

        return data
      } catch (error) {
        console.error(error)
        this.lastQuery = ''
        return false
      }
    }

    /**
     * Find medias of all file types with the given pagination
     * paremeters. The resulting query string is stored for
     * potential reuse with sorting parameters.
     */
    this.getAllMedias = async (pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      try {
        const query = `/acervo/find?pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
        const { data } = await axios.get(query)
        this.lastQuery = query

        return data
      } catch (error) {
        console.error(error)
        this.lastQuery = ''
        return false
      }
    }

    /**
     * Gets medias of file type passed as argument by calling its corresponding
     * fetch method. Unrecognized file types default to `all`, thus requesting
     * all file types.
     */
    this.getMediasByContentType = async (
      fetchMediaType, pagTamanho = this.pagTamanho, pagAtual = this.pagAtual
    ) => {
      let mediaItems

      switch (fetchMediaType) {
        case 'audio':
          this.fetchMediaType = 'audio'
          mediaItems = await this.getAudioMedias(pagTamanho, pagAtual)
          break
        case 'arquivo':
          this.fetchMediaType = 'arquivo'
          mediaItems = await this.getFileMedias(pagTamanho, pagAtual)
          break
        case 'imagem':
          this.fetchMediaType = 'imagem'
          mediaItems = await this.getImageMedias(pagTamanho, pagAtual)
          break
        case 'video':
          this.fetchMediaType = 'video'
          mediaItems = await this.getVideoMedias(pagTamanho, pagAtual)
          break
        case 'todos':
          this.fetchMediaType = 'todos'
          mediaItems = await this.getAllMedias(pagTamanho, pagAtual)
          break
        default:
          this.fetchMediaType = 'todos'
          mediaItems = await this.getAllMedias(pagTamanho, pagAtual)
      }

      return mediaItems
    }

    /**
     * Reuses the query parameter stored in `this.lastQuery` to request a
     * sorted result. The sorting method is evaluated through the `sortingType`
     * argument, which yields the additional query parameters needed.
     */
    this.applyMediaSorting = async (sortingType) => {
      let sortQuery = this.lastQuery

      switch (sortingType) {
        case 'alphabetical':
          sortQuery = sortQuery + '&ordem_campo=titulo&ordem_decrescente=false'
          break
        case 'newer':
          sortQuery = sortQuery + '&ordem_campo=created&ordem_decrescente=true'
          break
        case 'older':
          sortQuery = sortQuery + '&ordem_campo=created&ordem_decrescente=false'
          break
        default:
          sortQuery = ''
          break
      }

      if (sortQuery) {
        try {
          const { data } = await axios.get(sortQuery)
          return { success: true, data }
        } catch (error) {
          console.error(error)
          return { success: false }
        }
      } else return { success: false }
    }

    this.SubmissionException = function (name, message) {
      this.name = name
      this.message = message
    }
  }

  let manager

  function createManager () {
    manager = new MediaHandler()
    return manager
  }

  return {
    getManager: () => {
      return manager || createManager()
    }
  }
})()
