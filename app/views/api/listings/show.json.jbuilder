json.(@listing, :id, :currency)
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

json.bedrooms @listing.unit.bedrooms
json.bathrooms @listing.unit.bathrooms
json.reviews @listing.unit.reviews.with_status("published").order('reviewed_date DESC')
json.review_average @listing.unit.reviews.with_status("published").average(:rating)

json.availability @listing.unit.unit_availability
json.availability_calendar @listing.unit.unit_availability.cx_availability_calendar
json.booking_calendar @listing.unit.unit_availability.booking_calendar
json.default_availability_changeover @listing.unit.unit_availability.default_availability_changeover
json.average_default_nightly_price @listing.unit_pricing.average_default_nightly_price