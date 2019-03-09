require "image_processing/mini_magick"

class ImageUploader < Shrine
	include ImageProcessing::MiniMagick
	plugin :processing
	plugin :versions

	Attacher.validate do
    validate_max_size 10.megabyte, message: "is too large (max is 10 MB)"
    validate_mime_type_inclusion ['image/jpg', 'image/jpeg', 'image/png']
	end

	process(:store) do |io, context|
		original = io.download
		pipeline = ImageProcessing::MiniMagick.source(original)

		thumb = pipeline.resize_to_fill!(160, 90)
		original.close!

		{ original: io, thumb: thumb }
	end
end
