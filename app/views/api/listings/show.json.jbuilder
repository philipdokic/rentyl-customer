json.(@listing, :id)
json.unit @listing.unit
json.property @listing.unit.property

if @listing.unit.unit_images.present?
  json.unit_images @listing.unit.unit_images do |image|
    json.(image, :id, :image)
  end
end

if @listing.property.property_images.present?
  json.property_images @listing.property.property_images do |image|
    json.(image, :id, :image)
  end
end
