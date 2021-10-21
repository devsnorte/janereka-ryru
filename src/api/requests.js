import { axiosInstance as axios } from 'src/boot/axios'
import { APIError } from './exceptions'

/**
 * Submits new media metadata to the API. A POST request is sent
 * to the corresponding endpoint with properly set headers and
 * FormData.
 *
 * Successful requests return an updated media data object containing
 * the newly created API filepath. Otherwise, errors responses throw
 * a new APIError instance.
 *
 * This function expects session data and media resource metadata to
 * have been validated prior to being invoked.
 */
export async function requestMediaMetadataUpload (mediaDataObject, token) {
  try {
    const infoFormData = new FormData()
    infoFormData.append('titulo', mediaDataObject.title)
    infoFormData.append('descricao', mediaDataObject.description)
    infoFormData.append('tipo', mediaDataObject.mediaType)
    infoFormData.append('tags', mediaDataObject.tags.join(', '))
    infoFormData.append('autor', mediaDataObject.authorname)
    infoFormData.append('mocambo', mediaDataObject.tribe)

    const { data } = await axios({
      method: 'post',
      url: '/acervo/midia',
      data: infoFormData,
      headers: { token, 'Content-Type': 'application/x-www-form-urlencoded' }
    })

    mediaDataObject.mediaPath = data.path
    return mediaDataObject
  } catch (error) {
    throw new APIError('MetadataSubmissionError', 'Error while requesting media metadata submission. If error persists, please contact an administrator.', error)
  }
}

/**
 * Uploads a new media file to an existing API file path. A POST
 * request is sent to the corresponding endpoint with properly set
 * headers and FormData.
 *
 * Error responses throw a new APIError. Otherwise, this function
 * does not return data.
 *
 * This function expects session data and media file data to have
 * been validated prior to being invoked.
 */
export async function requestMediaFileUpload (mediaDataObject, token) {
  try {
    const fileFormData = new FormData()
    fileFormData.append('arquivo', mediaDataObject.mediaFile)

    await axios({
      method: 'post',
      url: `/acervo/upload/${mediaDataObject.mediaPath}`,
      data: fileFormData,
      headers: { token }
    })
  } catch (error) {
    throw new APIError('FileUploadError', 'Error during file upload. Deletion request dispatched for the corresponding path. If error persists, please contact an administrator.', error)
  }
}

/**
 * Updates a media resource's metadata in the API. A PUT request
 * is dispatched to the corresponding endpoint with properly set
 * headers and FormData.
 *
 * Error responses throw a new APIError. Otherwise, this function
 * does not return data.
 *
 * This function expects session data and media resource metadata
 * to have been validated prior to being invoked.
 */
export async function requestMediaUpdate (mediaDataObject, token) {
  try {
    const updateInfoFormData = new FormData()
    updateInfoFormData.append('titulo', mediaDataObject.title)
    updateInfoFormData.append('descricao', mediaDataObject.description)
    updateInfoFormData.append('tags', mediaDataObject.tags.join(', '))
    updateInfoFormData.append('autor', mediaDataObject.authorname)
    updateInfoFormData.append('mocambo', mediaDataObject.tribe)

    await axios({
      method: 'put',
      url: `/acervo/midia/${mediaDataObject.mediaPath}`,
      data: updateInfoFormData,
      headers: { token, 'Content-Type': 'application/x-www-form-urlencoded' }
    })
  } catch (error) {
    throw new APIError('MediaUpdateError', 'Error while requesting media metadata update. If error persists, please contact an administrator.', error)
  }
}

/**
 * Deletes media resources through the API. A DELETE request is
 * dispatched to the corresponding endpoint with properly set
 * headers.
 *
 * Error responses throw a new APIError. Otherwise, this function
 * does not return data.
 *
 * This function expects session data and media metadata needed
 * for deletion to have been validated prior to being invoked.
 */
export async function requestMediaDeletion (mediaDataObject, token) {
  try {
    await axios({
      method: 'delete',
      url: `/acervo/midia/${encodeURI(mediaDataObject.mediaPath)}`,
      headers: { token }
    })
  } catch (error) {
    throw new APIError('MediaDeletionError', 'Error while requesting media deletion. If error persists, please contact an administrator.', error)
  }
}

/**
 * Publishes medias through the API. A PUT request is sent to
 * the corresponding endpoint with properly set headers and
 * FormData. Specifically, the media resource's status is set
 * to 'published'
 *
 * Error responses throw a new APIError. Otherwise, this function
 * does not return data.
 *
 * This function expects session data and media metadata needed
 * for deletion to have been validated prior to being invoked.
 */
export async function requestMediaPublication (mediaDataObject, token) {
  try {
    await axios({
      method: 'put',
      url: `/acervo/publish/${mediaDataObject.mediaPath}`,
      headers: { token }
    })
  } catch (error) {
    throw new APIError('MediaPublicationError', 'Error while requesting media publication. Unable to proceed.', error)
  }
}

/**
 * Downloads media files from the API. A GET request is dispatched
 * to the corresponding endpoint with properly set headers.
 *
 * Error responses throw a new APIError. Otherwise, this function
 * retrieves the file as a blob object and returns it as an object
 * URL.
 *
 * This function expects session data to have been validated prior
 * to being invoked.
 */
export async function requestMediaDownload (mediaAPIPath, token) {
  try {
    const response = await axios({
      method: 'get',
      url: `/acervo/download/${encodeURIComponent(mediaAPIPath)}`,
      token: token,
      responseType: 'blob'
    })
    const url = URL.createObjectURL(response.data)
    return url
  } catch (error) {
    throw new APIError('MediaDownloadError', 'Error while requesting media file. Unable to download.', error)
  }
}

/**
 * Fetches medias resources using the query string passed as
 * argument. A GET request is dispatched using the query string,
 * with properly set headers.
 *
 * Error responses throw a new APIError. Otherwise, this function
 * return the resulting response data.
 *
 * This function expects session data to have been validated prior
 * to being invoked.
 */
export async function requestMediasByQueryString (query, token) {
  try {
    const { data } = await axios.get(query, { headers: { token } })
    return data
  } catch (error) {
    throw new APIError('MediaFetchError', `Error while requesting media resources to the API. Query string used: ${query}`, error)
  }
}
