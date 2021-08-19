import { axiosInstance as axios } from 'src/boot/axios'

export default class MediaSubmission {
  userToken = ''
  apiFilePath = ''
  success = false
  constructor (
    title,
    description,
    tagsArray,
    mediaFile,
    mediaFileType,
    userToken,
    apiFilePath,
    submissionSucces
  ) {
    this.title = title
    this.description = description
    this.tags = tagsArray
    this.mediaFile = mediaFile
    this.mediaFileType = mediaFileType
    this.userToken = userToken
    this.apiFilePath = apiFilePath
    this.success = submissionSucces
  }

  async performMediaDeletion () {
    try {
      await axios({
        method: 'delete',
        url: `/acervo/midia/${this.apiFilePath}`,
        headers: { token: this.userToken }
      })
    } catch (error) {
      console.error({
        error,
        message: `MediaSubmissionService: API response error for Media DELETE request at path: ${this.apiFilepath}`
      })
      throw error
    }
  }

  async performMediaDetailsSubmission () {
    // JSONify data as needed by this endpoint
    const jsonMediaData = JSON.stringify({
      titulo: this.title,
      descricao: this.description,
      tipo: this.mediaFileType,
      tags: this.tags
    })

    // Perform POST request
    try {
      const { data } = await axios({
        method: 'post',
        url: `/acervo/midia?name=${encodeURI(this.title)}`,
        data: jsonMediaData,
        headers: { token: this.userToken, 'Content-Type': 'application/json' }
      })

      // Retrieve the 'path' value and update on the instance
      this.apiFilePath = data.path
    } catch (error) {
      this.success = false
      console.error({
        error,
        message: 'MediaSubmissionService: API response error for Media Details POST request'
      })
      throw error
    }
  }

  async perforMediaFileSubmission () {
    // Insert file into FormData as necessary for this endpoint
    const mediaFormData = new FormData()
    mediaFormData.append('arquivo', this.mediaFile)

    // Perform POST request
    try {
      await axios({
        method: 'post',
        url: `/acervo/upload/${this.apiFilePath}`,
        data: mediaFormData,
        headers: { token: this.userToken }
      })

      this.success = true
    } catch (error) {
      this.success = false
      this.performMediaDeletion()
      console.error({
        error: error,
        message: `MediaSubmissionService: API response error for Media File POST request at path: '${this.apiFilePath}'`
      })
      throw error
    }
  }

  async submitNewMedia () {
    try {
      await this.performMediaDetailsSubmission()
      await this.perforMediaFileSubmission()
      return this.success
    } catch (error) {
      console.error(error)
      return this.success
    }
  }
}
