json.(@listing, :id)
json.unit @listing.unit
json.property @listing.unit.property
json.location @listing.unit.property.location

if @listing.unit.unit_images.present?
  json.unit_images @listing.unit.unit_images do |image|
    json.(image, :id, :image)
  end
end

if @listing.unit.property.property_images.present?
  json.property_images @listing.unit.property.property_images do |image|
    json.(image, :id, :image)
  end
end

json.availability @listing.unit.unit_availability
json.bedrooms @listing.unit.bedrooms
json.bathrooms @listing.unit.bathrooms
json.reviews @listing.unit.reviews.with_status("published").order('reviewed_date DESC')
json.review_average @listing.unit.reviews.with_status("published").average(:rating)