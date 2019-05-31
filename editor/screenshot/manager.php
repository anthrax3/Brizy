<?php

class Brizy_Editor_Screenshot_Manager {

	const BLOCK_TYPE_NORMAL = 'normal';
	const BLOCK_TYPE_GLOBAL = 'global';
	const BLOCK_TYPE_SAVED = 'saved';

	/**
	 * @var Brizy_Editor_UrlBuilder
	 */
	private $urlBuilder;

	/**
	 * Brizy_Editor_Screenshot_Manager constructor.
	 *
	 * @param Brizy_Editor_UrlBuilder $urlBuilder
	 */
	public function __construct( Brizy_Editor_UrlBuilder $urlBuilder ) {
		$this->urlBuilder = $urlBuilder;
	}


	/**
	 * @param $screenUid
	 * @param $blockType
	 * @param $imageContent
	 * @param $postId
	 *
	 * @return bool
	 */
	public function saveScreenshot( $screenUid, $blockType, $imageContent, $postId ) {
		$path = $this->getScreenshotPath( $screenUid, $blockType, $postId );

		$extension = $this->getFileExtensionByContent( $imageContent );

		if ( ! in_array( $extension, array( 'jpg', 'jpeg', 'gif', 'png' ) ) ) {
			return false;
		}

		$screenFileName = $screenUid . '.' . $extension;
		$screenFullPath = $path . DIRECTORY_SEPARATOR . $screenFileName;
		try {
			return $this->storeThumbnail( $imageContent, $screenFullPath );
		} catch ( Exception $e ) {
			return false;
		}
	}

	public function getScreenshot( $screenUid, $postId = null ) {
		$types = array( self::BLOCK_TYPE_NORMAL, self::BLOCK_TYPE_GLOBAL, self::BLOCK_TYPE_SAVED );

		foreach ( $types as $type ) {
			$filePath = $this->getScreenshotPath( $screenUid, $type, $postId );

			$globStr     = $filePath . DIRECTORY_SEPARATOR . "{$screenUid}.*";
			$screenshots = glob( $globStr );

			if ( isset( $screenshots[0] ) && file_exists( $screenshots[0] ) ) {
				return $screenshots[0];
			}
		}

		return null;
	}


	private function getScreenshotPath( $screenUID, $blockType, $postID ) {
		$folderPath = null;

		switch ( $blockType ) {
			case self::BLOCK_TYPE_NORMAL:
				$this->urlBuilder->set_post_id( $postID );
				$folderPath = $this->urlBuilder->page_upload_path( 'blockThumbnails' );
				break;
			case self::BLOCK_TYPE_GLOBAL:
				$folderPath = $this->urlBuilder->brizy_upload_path( 'blockThumbnails' . DIRECTORY_SEPARATOR . 'global' );
				break;
			case self::BLOCK_TYPE_SAVED:
				$folderPath = $this->urlBuilder->brizy_upload_path( 'blockThumbnails' . DIRECTORY_SEPARATOR . 'saved' );
				break;
			default:
				return null;
		}

		return $folderPath;
	}


	/**
	 * @param $content
	 * @param $filePath
	 *
	 * @return bool
	 */
	private function storeThumbnail( $content, $filePath ) {
		$store_file = $this->storeFile( $content, $filePath );

		if ( $store_file ) {
			$store_file = $this->resizeImage( $filePath );
		}

		return $store_file;
	}

	/**
	 * @param $content
	 * @param $thumbnailFullPath
	 *
	 * @return bool
	 */
	private function storeFile( $content, $thumbnailFullPath ) {
		$path = dirname( $thumbnailFullPath );

		if ( ! file_exists( $path ) ) {
			if ( ! @mkdir( $path, 0755, true ) ) {
				return false;
			}
		}

		return file_put_contents( $thumbnailFullPath, $content ) !== false;
	}


	/**
	 * @param $thumbnailFullPath
	 *
	 * @return bool
	 */
	private function resizeImage( $thumbnailFullPath ) {
		try {
			$imageEditor = wp_get_image_editor( $thumbnailFullPath );

			if ( $imageEditor instanceof WP_Error ) {
				throw new Exception( $imageEditor->get_error_message() );
			}

			$imageEditor->resize( 600, 600 );
			$result = $imageEditor->save( $thumbnailFullPath );

			return is_array( $result );
		} catch ( Exception $e ) {
			return false;
		}
	}

	protected function getFileExtensionByContent( $content ) {
		$tmpfname = tempnam( sys_get_temp_dir(), "blockScreenShot" );

		$handle = fopen( $tmpfname, "w" );
		fwrite( $handle, $content );
		fclose( $handle );

		$mimeType = wp_get_image_mime( $tmpfname );

		return $this->getExtentsionByMime( $mimeType );
	}

	/**
	 * @param $filename
	 * @param int $mode
	 *
	 * @return mixed|string
	 */
	protected function getExtentsionByMime( $mimeType ) {

		$extensions = array(
			'image/png'  => 'png',
			'image/jpeg' => 'jpeg',
			'image/jpg'  => 'jpg',
			'image/gif'  => 'gif',
		);

		if ( isset( $extensions[ $mimeType ] ) ) {
			return $extensions[ $mimeType ];
		}

		return null;
	}

}