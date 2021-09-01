import { axiosInstance as axios } from 'src/boot/axios'
import { Session } from './SessionManager'

export const SubmissionManager = (function () {
  function MediaHandler () {
    this.session = Session.getSessionManager()
    this.mediaObject = {}
    this.token = null

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

        const jsonMediaInfo = JSON.stringify({
          titulo: this.mediaObject.title,
          descricao: this.mediaObject.description,
          tags: this.mediaObject.tags,
          tipo: this.mediaObject.mediaType
        })

        const { data } = await axios({
          method: 'post',
          url: `/acervo/midia?name=${encodeURI(this.mediaObject.title)}`,
          data: jsonMediaInfo,
          headers: { token: this.token, 'Content-Type': 'application/json' }
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

        if (!fileName) {
          throw new this.SubmissionException('MediaDataError', 'No media file name found. Can not upload.')
        }

        const jsonMediaInfo = JSON.stringify({
          titulo: this.mediaObject.title,
          descricao: this.mediaObject.description,
          tags: this.mediaObject.tags,
          tipo: this.mediaObject.mediaType,
          arquivo: fileName
        })

        await axios({
          method: 'put',
          url: `/acervo/midia/${this.mediaObject.mediaPath}`,
          data: jsonMediaInfo,
          headers: { token: this.token, 'Content-Type': 'application/json' }
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
