import { axiosInstance as axios } from 'src/boot/axios'
import { Session } from './SessionManager'

export const MediaManager = (function () {
  function MediaHandler () {
    this.session = Session.getSessionManager()
    this.mediaObject = {}
    this.token = null

    // Media query parameters
    this.fetchMediaType = 'todos'
    this.pagTamanho = 1000
    this.pagAtual = 1
    this.ordemDecrescente = false

    this.unmakeMediaObject = () => {
      this.mediaObject = {}
    }

    this.makeMediaObject = (title, description, tags, mediaFile, mediaType, mediaPath) => {
      this.unmakeMediaObject()

      this.mediaObject = {
        title, description, tags, mediaFile, mediaType, mediaPath: mediaPath || null
      }
    }

    this.isMediaObjectEmpty = () => {
      if (Object.keys(this.mediaObject).length === 0) return true
      else return false
    }

    this.refreshToken = () => {
      const sessionData = this.session.getSession()
      this.token = sessionData.token
    }

    this.validateAuthentication = () => {
      if (!this.session.isAuthenticated()) {
        throw new this.SubmissionException('AuthenticationValidationError', 'No user is authenticated.')
      }
    }

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

    this.validateForUpload = () => {
      this.validateForSubmission()

      if (!this.mediaObject.mediaFile) {
        throw new this.SubmissionException('MediaDataValidationError', 'No media file found. Can not upload.')
      }
      if (!this.mediaObject.mediaPath) {
        throw new this.SubmissionException('MediaDataValidationError', 'No media path found. Can not upload.')
      }
    }

    this.validateForDeletion = () => {
      if (this.isMediaObjectEmpty()) {
        throw new this.SubmissionException('DeletionValidationError', 'Media data is empty. Unable to delete.')
      }

      if (!this.mediaObject.mediaPath) {
        throw new this.SubmissionException('DeletionValidationError', 'No media path found. Unable to delete.')
      }
    }

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

    this.handleMediaDeletion = async () => {
      try {
        this.validateAuthentication()
        this.validateForDeletion()
        console.log(this.mediaObject)

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

    this.getMediasByHashtag = async (hashtag, pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      try {
        const { data } = await axios.get(
          `/acervo/find?hashtags=${hashtag}&pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
        )
        return data
      } catch (error) {
        console.log(error)
        return false
      }
    }

    this.getMediasByKeyword = async (keyword, pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      try {
        const { data } = await axios.get(
          `/acervo/find?keywords=${keyword}&pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
        )
        return data
      } catch (error) {
        console.log(error)
        return false
      }
    }

    this.getAudioMedias = async (pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      try {
        const { data } = await axios.get(
          `/acervo/find?tipos=audio&pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
        )
        return data
      } catch (error) {
        console.error(error)
        return false
      }
    }

    this.getFileMedias = async (pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      try {
        const { data } = await axios.get(
          `/acervo/find?tipos=arquivo&pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
        )
        return data
      } catch (error) {
        console.error(error)
        return false
      }
    }

    this.getImageMedias = async (pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      try {
        const { data } = await axios.get(
          `/acervo/find?tipos=imagem&pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
        )
        return data
      } catch (error) {
        console.error(error)
        return false
      }
    }

    this.getVideoMedias = async (pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      try {
        const { data } = await axios.get(
          `/acervo/find?tipos=video&pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
        )
        return data
      } catch (error) {
        console.error(error)
        return false
      }
    }

    this.getAllMedias = async (pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      try {
        const { data } = await axios.get(
          `/acervo/find?pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
        )
        return data
      } catch (error) {
        console.error(error)
        return false
      }
    }

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
