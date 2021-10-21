import { Session } from './SessionManager'
import { APIError } from './exceptions'

const sessionManager = Session.getSessionManager()

/**
 * Verifies whether the current user is authenticated. If not,
 * throws an APIError.
 */
export function validateUserIsAuthenticated () {
  if (!sessionManager.isAuthenticated()) {
    throw new APIError('AuthenticationError', 'No user is authenticated.', 'Invalid session.')
  }
}

/**
 * Verifies whether the current user is authenticated. If not,
 * throws an APIError.
 */
export function validateUserIsAdmin () {
  if (!sessionManager.isAdmin()) {
    throw new APIError('AuthenticationError', 'The current user does not have administrative permissions.', 'Invalid permissions. User is not admin.')
  }
}

/**
 * Verifies whether the media data object is empty, returning a
 * boolean. Used by other validation fuctions.
 */
export function validateMediaDataNotEmpty (mediaDataObject) {
  if (Object.keys(mediaDataObject).length === 0) return true
  else return false
}

/**
 * Validates whether the media data object contains all metadada
 * needed for correct submission to the API. Missing or invalid
 * data throw an APIError.
 *
 * Metadata validation does not cover the media file itself or
 * existing API filepaths. These are validated by dedicated
 * functions.
 */
export function validateMediaMetadata (mediaDataObject) {
  if (validateMediaDataNotEmpty(mediaDataObject)) {
    throw new APIError('MetadataValidationError', 'Media data is empty. Can not submit.', 'Invalid `mediaDataObject`.')
  }

  if (!mediaDataObject.title) {
    throw new APIError('MetadataValidationError', 'Media title is empty. Can not submit.', 'Invalid `mediaDataObject`.')
  }

  if (!mediaDataObject.description) {
    throw new APIError('MetadataValidationError', 'Media description is empty. Can not submit.', 'Invalid `mediaDataObject`.')
  }

  if (!mediaDataObject.mediaType) {
    throw new APIError('MetadataValidationError', 'Media file type was not set. Can not submit.', 'Invalid `mediaDataObject`.')
  }

  if (!Array.isArray(mediaDataObject.tags)) {
    throw new APIError('MetadataValidationError', 'Media tags are not set as array. Can not submit.', 'Invalid `mediaDataObject`.')
  } else {
    mediaDataObject.tags.forEach(tag => {
      if (typeof (tag) !== 'string') {
        throw new APIError('MetadataValidationError', 'One of the media tags is not a string. Can not submit.', 'Invalid `mediaDataObject`.')
      }
    })
  }

  if (!mediaDataObject.authorname) {
    throw new APIError('MetadataValidationError', 'Author name not found. Can not submit.', 'Invalid `mediaDataObject`.')
  }

  if (!mediaDataObject.tribe) {
    throw new APIError('MetadataValidationError', 'Author indigenous group not found. Can not submit.', 'Invalid `mediaDataObject`.')
  }
}

/**
 * Validates whether the media data object contains a valid media
 * file and media filepath. This validation is needed for PUT and
 * POST requests for the media upload endpoint.
 */
export function validateMediaDataForFileUpload (mediaDataObject) {
  validateMediaMetadata(mediaDataObject)

  if (!mediaDataObject.mediaPath) {
    throw new APIError('FileDataValidationError', 'No media path found. Can not upload.', 'Invalid `mediaDataObject`.')
  }
}

/**
 * Validates whether the media data object contains valid metadata
 * and media filepath. This validation is needed for PUT requests
 * to the corresponding resource endpoint.
 *
 * The media file is kept unchanged to preserve the resource's API
 * path. To change files, it would be best to delete the old media
 * resource and submit a new one, thus avoiding duplicate or unused
 * medias in the API.
 */
export function validateMediaDataForUpdate (mediaDataObject) {
  if (validateMediaDataNotEmpty(mediaDataObject)) {
    throw new APIError('MediaUpdateValidationError', 'Media data is empty. Can not upload.', 'Invalid `mediaDataObject`.')
  }

  if (!mediaDataObject.mediaPath) {
    throw new APIError('MediaUpdateValidationError', 'No media path found. Can not upload.', 'Invalid `mediaDataObject`.')
  }
}

/**
 * Validates whether the media holder object contains the bare
 * data required for DELETE requests, namely the resource's API
 * filepath.
 */
export function validateMediaDataForDeletion (mediaDataObject) {
  if (validateMediaDataNotEmpty(mediaDataObject)) {
    throw new APIError('DeletionValidationError', 'Media data is empty. Unable to delete.', 'Invalid `mediaDataObject`.')
  }

  if (!mediaDataObject.mediaPath) {
    throw new APIError('DeletionValidationError', 'No media path found. Unable to delete.', 'Invalid `mediaDataObject`.')
  }
}

/**
 * Validates whether the media holder object contains the bare
 * data required for punlication, namely the resource's API
 * filepath.
 */
export function validateMediaDataForPublication (mediaDataObject) {
  if (validateMediaDataNotEmpty(mediaDataObject)) {
    throw new APIError('PublicationValidationError', 'Media data is empty. Unable to publish.', 'Invalid `mediaDataObject`.')
  }

  if (!mediaDataObject.mediaPath) {
    throw new APIError('PublicationValidationError', 'No media path found. Unable to publish.', 'Invalid `mediaDataObject`.')
  }
}
