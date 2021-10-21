import { Session } from './SessionManager'
import * as handlers from './handlers'

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
    this.defaultQuery = `/acervo/find?pag_tamanho=${this.pagTamanho}&pag_atual=${this.pagAtual}`

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
    this.makeMediaObject = (title, description, tags, authorname, tribe, mediaFile, mediaType, mediaPath) => {
      this.unmakeMediaObject()

      this.mediaObject = {
        title, description, tags, authorname, tribe, mediaFile, mediaType, mediaPath: mediaPath || null
      }
    }

    /**
     * Performs creation of new medias in the API.
     */
    this.performMediaCreation = async () => await handlers.handleMediaCreation(this.mediaObject)

    /**
     * Performs update of existing medias in the API.
     */
    this.performMediaUpdate = async () => await handlers.handleMediaUpdate(this.mediaObject)

    /**
     * Performs publication of existing medias in the API.
     */
    this.performMediaPublication = async () => await handlers.handleMediaPublication(this.mediaObject)

    /**
     * Performs deletion of existing medias in the API.
     */
    this.performMediaDeletion = async () => await handlers.handleMediaDeletion(this.mediaObject)

    /**
     * Performs download of existing media files from the API.
     */
    this.performMediaDownload = async (mediaAPIPath) => await handlers.handleMediaDownload(mediaAPIPath)

    /**
     * Find medias uploaded by a given user, with the given pagination
     * parameters.
     */
    this.getMediasFromUser = async (
      username, pagTamanho = this.pagTamanho, pagAtual = this.pagAtual
    ) => {
      const query = `/acervo/find?pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}&creator=${username}`
      const medias = await handlers.handleGetMediaByQuery(query)
      return medias
    }

    /**
     * Find medias uploaded by a given user with published status, with the
     * given pagination parameters.
     */
    this.getSubmissionsFromUser = async (
      username, pagTamanho = this.pagTamanho, pagAtual = this.pagAtual
    ) => {
      const query = `/acervo/find?pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}&creator=${username}&status=published`
      const medias = await handlers.handleGetMediaByQuery(query)
      return medias
    }

    /**
     * Find medias from any users with 'draft' status, with the given pagination
     * parameters.
     */
    this.getAllUnpublishedMedias = async (
      pagTamanho = this.pagTamanho, pagAtual = this.pagAtual
    ) => {
      const query = `/acervo/find?pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}&status=draft`
      const medias = await handlers.handleGetMediaByQuery(query)
      return medias
    }

    /**
     * Find medias with a given hashtag and pagination paremeters.
     * The resulting query string is stored for potential reuse
     * with sorting parameters.
     */
    this.getMediasByHashtag = async (hashtag, pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      const query = `/acervo/find?hashtags=${hashtag}&pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
      const medias = await handlers.handleGetMediaByQuery(query)

      if (medias) this.lastQuery = query
      else this.lastQuery = ''

      return medias
    }

    /**
     * Find medias using given keywords and pagination paremeters.
     * The resulting query string is stored for potential reuse
     * with sorting parameters.
     */
    this.getMediasByKeywords = async (keywords, pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      const query = `/acervo/find?keywords=${keywords}&pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
      const medias = await handlers.handleGetMediaByQuery(query)

      if (medias) this.lastQuery = query
      else this.lastQuery = ''

      return medias
    }

    /**
     * Find audio medias with the given pagination paremeters.
     * The resulting query string is stored for potential reuse
     * with sorting parameters.
     */
    this.getAudioMedias = async (pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      const query = `/acervo/find?tipos=audio&pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
      const medias = await handlers.handleGetMediaByQuery(query)

      if (medias) this.lastQuery = query
      else this.lastQuery = ''

      return medias
    }

    /**
     * Find file medias with the given pagination paremeters.
     * The resulting query string is stored for potential reuse
     * with sorting parameters.
     */
    this.getFileMedias = async (pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      const query = `/acervo/find?tipos=arquivo&pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
      const medias = await handlers.handleGetMediaByQuery(query)

      if (medias) this.lastQuery = query
      else this.lastQuery = ''

      return medias
    }

    /**
     * Find image medias with the given pagination paremeters.
     * The resulting query string is stored for potential reuse
     * with sorting parameters.
     */
    this.getImageMedias = async (pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      const query = `/acervo/find?tipos=imagem&pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
      const medias = await handlers.handleGetMediaByQuery(query)

      if (medias) this.lastQuery = query
      else this.lastQuery = ''

      return medias
    }

    /**
     * Find video medias with the given pagination paremeters.
     * The resulting query string is stored for potential reuse
     * with sorting parameters.
     */
    this.getVideoMedias = async (pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      const query = `/acervo/find?tipos=video&pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
      const medias = await handlers.handleGetMediaByQuery(query)

      if (medias) this.lastQuery = query
      else this.lastQuery = ''

      return medias
    }

    /**
     * Find medias of all file types with the given pagination
     * paremeters. The resulting query string is stored for
     * potential reuse with sorting parameters.
     */
    this.getAllMedias = async (pagTamanho = this.pagTamanho, pagAtual = this.pagAtual) => {
      const query = `/acervo/find?pag_tamanho=${pagTamanho}&pag_atual=${pagAtual}`
      const medias = await handlers.handleGetMediaByQuery(query)

      if (medias) this.lastQuery = query
      else this.lastQuery = ''

      return medias
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
        const medias = await handlers.handleGetMediaByQuery(sortQuery)
        if (medias) return { success: true, data: medias }
        else return { success: false }
      } else return { success: false }
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
