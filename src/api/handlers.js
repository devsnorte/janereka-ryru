import { Session } from './SessionManager'
// import { APIError } from './exceptions'
import * as validators from './validators'
import * as requests from './requests'

const sessionManager = Session.getSessionManager()

/**
 * Handles metadata subimission. Validates session and media data,
 * invokes the corresponding request method and then invokes the
 * file upload handler, catching any errors on the process.
 *
 * Returns false if either validations or request dispatching fail.
 * Otherwise, invokes the file upload handler in order to proceed
 * with media resource creation.
 */
export async function handleMediaCreation (mediaDataObject) {
  try {
    validators.validateUserIsAuthenticated()
    validators.validateMediaMetadata(mediaDataObject)

    const { token } = sessionManager.getSession()
    const updatedMediaDataObject = await requests.requestMediaMetadataUpload(
      mediaDataObject, token
    )

    const success = await handleMediaFileUpload(updatedMediaDataObject, token)

    return success
  } catch (error) {
    console.info(error)
    return false
  }
}

/**
 * Handles file upload. Validates session and media data if needed
 * and invokes the corresponding request method, catching any
 * errors on the process.
 *
 * Returns false if either validations or request dispatching fail.
 * Otherwise, returns true.
 *
 * Errors will also trigger the media deletion handler, thus preventing
 * invalid media resources to persist in the API.
 */
export async function handleMediaFileUpload (mediaDataObject, token = null) {
  try {
    if (!token) {
      // Re-validate session if no token
      validators.validateUserIsAuthenticated()
      token = sessionManager.getSession().token
    }

    validators.validateMediaDataForFileUpload(mediaDataObject)

    await requests.requestMediaFileUpload(mediaDataObject, token)

    return true
  } catch (error) {
    console.info(error)
    await handleMediaDeletion(mediaDataObject, token)
    return false
  }
}

/**
 * Handles media resource update. Validates session and media
 * data and invokes the corresponding request method, catching
 * any errors on the process.
 *
 * Returns false if either validations or request dispatching fail.
 * Otherwise, returns true.
 */
export async function handleMediaUpdate (mediaDataObject) {
  try {
    validators.validateUserIsAuthenticated()
    validators.validateMediaDataForUpdate(mediaDataObject)

    const { token } = sessionManager.getSession()
    await requests.requestMediaUpdate(mediaDataObject, token)

    return true
  } catch (error) {
    console.info(error)
    return false
  }
}

/**
 * Handles media resource deletion. Validates session and media
 * data and invokes the corresponding request method, catching
 * any errors on the process.
 *
 * Returns false if either validations or request dispatching fail.
 * Otherwise, returns true.
 */
export async function handleMediaDeletion (mediaDataObject, token = null) {
  try {
    if (!token) {
      // Re-validate session if no token
      validators.validateUserIsAuthenticated()
      token = sessionManager.getSession().token
    }

    validators.validateMediaDataForDeletion(mediaDataObject)

    await requests.requestMediaDeletion(mediaDataObject, token)

    return true
  } catch (error) {
    console.info(error)
    return false
  }
}

/**
 * Handles media resource publication. Validates session and media
 * data and invokes the corresponding request method, catching any
 * errors on the process.
 *
 * Returns false if either validations or request dispatching fail.
 * Otherwise, returns true.
 */
export async function handleMediaPublication (mediaDataObject) {
  try {
    validators.validateUserIsAdmin()
    validators.validateMediaDataForPublication(mediaDataObject)

    const { token } = sessionManager.getSession()
    await requests.requestMediaPublication(mediaDataObject, token)

    return true
  } catch (error) {
    console.info(error)
    return false
  }
}

/**
 * Handles media file download. Validates session data and invokes
 * the corresponding request method, catching any errors on the
 * process.
 *
 * Returns false if either validations or request dispatching fail.
 * Otherwise, returns the file as an object URL.
 */
export async function handleMediaDownload (mediaAPIPath) {
  try {
    validators.validateUserIsAuthenticated()

    const { token } = sessionManager.getSession()
    const fileURLObject = await requests.requestMediaDownload(mediaAPIPath, token)

    return fileURLObject
  } catch (error) {
    console.info(error)
    return false
  }
}

/**
 * Handles fetching media resources using a query string passed as
 * arguments. Validates session data and invokes the corresponding
 * request method, catching any errors on the process.
 *
 * Returns false if either validations or request dispatching fail.
 * Otherwise, returns the found media resources.
 */
export async function handleGetMediaByQuery (query) {
  try {
    validators.validateUserIsAuthenticated()
    const { token } = sessionManager.getSession()
    const medias = await requests.requestMediasByQueryString(query, token)

    return medias
  } catch (error) {
    console.info(error)
    return false
  }
}
