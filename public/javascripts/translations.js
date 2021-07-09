I18n.translations || (I18n.translations = {});
I18n.translations["en"] = I18n.extend((I18n.translations["en"] || {}), {"activerecord":{"errors":{"messages":{"record_invalid":"Validation failed: %{errors}","restrict_dependent_destroy":{"has_many":"Cannot delete record because dependent %{record} exist","has_one":"Cannot delete record because a dependent %{record} exists"}},"models":{"booking":{"attributes":{"booking_range":{"not_available":"is invalid. These dates are not available to book for this listing."}}},"employee":{"attributes":{"email":{"already_taken":"has already been used by an organization owner. Please use a different email."}}}}}},"admin":{"dashboard":{"brand":{"test":"test"},"listing":{"test":"test"},"organization":{"test":"test"},"property":{"test":"test"},"unit":{"test":"test"}},"errors":{"test":"test"},"global":{"test":"test"}},"cx":{"checkout":{"booking_info_html":"\u003cb\u003e%{guests}\u003c/b\u003e for \u003cb\u003e%{nights}\u003c/b\u003e from \u003cb\u003e%{checkIn}\u003c/b\u003e to \u003cb\u003e%{checkOut}\u003c/b\u003e","cancel_policy":"Cancellation Policy"},"details":{"apply_coupon":"Apply a coupon or promotion code","bad_code":"Sorry, your coupon cannot be applied to this booking","headers":{"accomodations":"Accomodations","amenities":"Amenities","availability":"Availability","booking_deposit_policy":"Booking Deposit Policy","cancel_policy":"Cancellation Policy","check_in_out":"Check-in / Check-out","description":"Description","overview":"Overview","rules":"Terms \u0026 Conditions","summary":"Summary","unit_info":"Unit info","units":"Units"},"location":"Location","location_disclaimer":"This listing's full address will be made available to you upon booking.","location_disclaimer_with_city_html":"This listing is located in \u003cb\u003e%{location}\u003c/b\u003e. The listing's full address will be made available to you upon booking.","manager":"Manager","map":"Map","no_charge":"You will not be charged yet.","overview":"Overview","owner":"Owner","reviews":"Reviews","rules":{"check_in":"Check-in time","check_out":"Check-out time","prior_notify":"Prior notification before booking","stay_max":"Maximum stay","stay_min":"Minimum stay"},"summary":{"num_bathrooms":"%{num} bathroom%{s}","num_bedrooms":"%{num} bedroom%{s}","num_sleep_in_beds":"Sleeps %{num} guest%{s} in bed%{s}"},"view_map":"View on map"},"errors":{"booking":{"cardCvv":{"empty":"Card CVV cannot be empty.","invalid":"Card CVV is invalid."},"cardExpiry":{"empty":"Card expiration date cannot be empty.","invalid":"Card expiration is an invalid date.","length_low":"Card expiration date is too short."},"cardNumber":{"empty":"Card number cannot be empty.","invalid":"Card number is invalid.","length_low":"Card number is too short."},"customerEmail":{"empty":"Email address cannot be empty.","invalid":"Email address is invalid.","length_low":"Email address is too short."},"customerName":{"empty":"Full name cannot be empty.","length_low":"Full name is too short."},"customerPostalCode":{"empty":"Postal code cannot be empty.","length_high":"Postal code is too long to be valid.","length_low":"Postal code is too short to be valid."},"customerTelephone":{"empty":"Telephone number cannot be empty.","length_low":"Telephone number is too short to be valid."},"guests":{"bounds_high":"Too many guests for this listing.","bounds_low":"Too few guests for this listing.","empty":"Guests cannot be empty.","invalid":"Number of guests is invalid."}},"listing_advance_stay_unmatched":"Sorry, this listing does not accept bookings within %{} days before check-in. Please adjust your check-in date.","listing_booked":"Sorry, this listing is already booked for the days you have selected. Please adjust your dates.","listing_changeover_unmatched":"Sorry, this property does not allow check-in or check-out on the dates you have selected. Your check-in date allows: %{checkInChangeover}. Your check-out date allows: %{checkOutChangeover}.","listing_generic":"Sorry, this listing is not available for booking at this time.","listing_guests_unmatched":"Sorry, you have more guests than this listing can accommodate.","listing_los_unmatched":"Sorry, the dates you have selected do not match this listing's length of stay rules. Please adjust your dates.","listing_unavailable":"Sorry, this listing is not available for booking on the days you have selected. Please adjust your dates."},"global":{"add_ons":"Extra Add-Ons","amenities":{"bathroom":"Bathroom","bathroom_info":"Bathroom Information","bathrooms":"Bathrooms","bed":"Beds","bedroom":"Bedroom","bedroom_info":"Bedroom Information","bedrooms":"Bedrooms","beds":"Beds","property_type_label":"Property type","sleeps":"Sleeps","unit_type_label":"Unit type"},"book":{"long":"Book this Listing","short":"Book","with_name":"Book %{PROPERTY_NAME}"},"book_confirm":{"contract":"By submitting the form above, you agree to abide by the terms and conditions put forth in the rental agreement. ","contract_link":"View rental agreement","rules":"By submitting the form above, you agree to this listing's \u003ca href='%{property_url}#details-rules' target='_blank'\u003eterms and conditions\u003c/a\u003e."},"book_inquiry":{"long":"Request to Book","short":"Request","with_name":"Request to Book %{PROPERTY_NAME}"},"booking_information":"Booking information","changeover":{"any":"check-in or check-out","check_in":"check-in only","check_out":"check-out only","none":"neither check-in nor check-out"},"check_in":"Check-in","check_out":"Check-out","colophon":"© %{year} %{brand}. All Rights Reserved.","customer_information":"Customer information","days_until_trip":{"plural_html":"Your trip is in \u003cb\u003e%{days}\u003c/b\u003e days.","single_html":"Your trip is \u003cb\u003etomorrow\u003c/b\u003e.","today_html":"Your trip is \u003cb\u003etoday\u003c/b\u003e!"},"home":"Home","immediate_payment":"Amount due today","immediate_payment_description":"This property requires a deposit to confirm booking. This amount will be charged today, and will be deducted from the total cost of your stay.","label":"Label","listing":{"featured":{"plural":"Featured Listings","single":"Featured Listing"},"plural":"Listings","single":"Listing","view":{"plural":"View Listings","single":"View Listing"}},"listing_information":"Listing information","owner_login":"Owner login","page":{"featured":{"plural":"Featured Pages","single":"Featured Page"},"read_more":"Read more ➝"},"payment_information":"Payment information","price":"Price","pricing":{"avg_per_night":"avg. per night","per_night":"per night"},"property_manager_information":"Property manager information","remaining":"Remaining","reservation_information":"Reservation information","see_details":{"long":"See listing details","short":"See details"},"sitemap":"Sitemap","social":{"facebook":"Facebook","instagram":"Instagram","pinterest":"Pinterest","snapchat":"Snapchat","twitter":"Twitter"},"taxes":"Taxes","total":"Total"},"receipt":{"booked":"Booked","booking":{"short":"Booking","with_code":"Booking: %{code}"},"booking_status":{"canceled":"This booking has been canceled.","confirmed":"Your booking is confirmed.","unconfirmed":"The property manager has not yet confirmed your booking request.","verified":"Your booking has been verified."},"cc_info":"%{brand} ending in %{last_4}","check_in":"Check-in","check_out":"Check-out","guests":"Guests","nights":"Nights","view_map":"View on map"},"search":{"filter":{"dates":"Check-in / check-out dates","label":{"long":"Filter Listings","short":"Filter"},"nightly_price":"Nightly price","num_bathrooms":"Number of bathrooms","num_bedrooms":"Number of bedrooms","num_guests":"Number of guests"},"location_all":"All locations","num_bathrooms":"%{num} bathroom%{s}","num_bedrooms":"%{num} bedroom%{s}","num_results":{"filtered":{"plural_html":"\u003cb\u003e%{num}\u003c/b\u003e listings match your search criteria, showing \u003cb\u003e%{num_filtered}\u003c/b\u003e filtered listings.","single_html":"\u003cb\u003e%{num}\u003c/b\u003e listings match your search criteria, showing \u003cb\u003e%{num_filtered}\u003c/b\u003e filtered listing."},"no_filtered_results":"No listings available that match your search criteria and filters.","no_results":"No listings available for your search criteria.","unfiltered":{"plural_html":"\u003cb\u003e%{num}\u003c/b\u003e listings match your search criteria.","single_html":"\u003cb\u003e%{num}\u003c/b\u003e listing matches your search criteria."}},"num_sleep":"%{num} guest%{s}","num_units":"%{num} unit%{s}","re_search_with_map":"Search as I move the map","sort":{"default":"Default","label":"Sort","name":"Name (A-Z)","price_asc":"Price (Low-High)","price_desc":"Price (High-Low)"}}},"date":{"abbr_day_names":["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],"abbr_month_names":[null,"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"day_names":["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"formats":{"default":"%Y-%m-%d","long":"%B %d, %Y","short":"%b %d"},"month_names":[null,"January","February","March","April","May","June","July","August","September","October","November","December"],"order":["year","month","day"]},"datetime":{"distance_in_words":{"about_x_hours":{"one":"about 1 hour","other":"about %{count} hours"},"about_x_months":{"one":"about 1 month","other":"about %{count} months"},"about_x_years":{"one":"about 1 year","other":"about %{count} years"},"almost_x_years":{"one":"almost 1 year","other":"almost %{count} years"},"half_a_minute":"half a minute","less_than_x_minutes":{"one":"less than a minute","other":"less than %{count} minutes"},"less_than_x_seconds":{"one":"less than 1 second","other":"less than %{count} seconds"},"over_x_years":{"one":"over 1 year","other":"over %{count} years"},"x_days":{"one":"1 day","other":"%{count} days"},"x_minutes":{"one":"1 minute","other":"%{count} minutes"},"x_months":{"one":"1 month","other":"%{count} months"},"x_seconds":{"one":"1 second","other":"%{count} seconds"}},"prompts":{"day":"Day","hour":"Hour","minute":"Minute","month":"Month","second":"Seconds","year":"Year"}},"errors":{"connection_refused":"Oops! Failed to connect to the Web Console middleware.\nPlease make sure a rails development server is running.\n","format":"%{attribute} %{message}","messages":{"accepted":"must be accepted","blank":"can't be blank","confirmation":"doesn't match %{attribute}","empty":"can't be empty","equal_to":"must be equal to %{count}","even":"must be even","exclusion":"is reserved","greater_than":"must be greater than %{count}","greater_than_or_equal_to":"must be greater than or equal to %{count}","inclusion":"is not included in the list","invalid":"is invalid","less_than":"must be less than %{count}","less_than_or_equal_to":"must be less than or equal to %{count}","model_invalid":"Validation failed: %{errors}","not_a_number":"is not a number","not_an_integer":"must be an integer","odd":"must be odd","other_than":"must be other than %{count}","present":"must be blank","required":"must exist","taken":"has already been taken","too_long":{"one":"is too long (maximum is 1 character)","other":"is too long (maximum is %{count} characters)"},"too_short":{"one":"is too short (minimum is 1 character)","other":"is too short (minimum is %{count} characters)"},"wrong_length":{"one":"is the wrong length (should be 1 character)","other":"is the wrong length (should be %{count} characters)"}},"unacceptable_request":"A supported version is expected in the Accept header.\n","unavailable_session":"Session %{id} is no longer available in memory.\n\nIf you happen to run on a multi-process server (like Unicorn or Puma) the process\nthis request hit doesn't store %{id} in memory. Consider turning the number of\nprocesses/workers to one (1) or using a different server in development.\n"},"global":{"actions":{"back":{"plain":"Back","with_arrow":"← Back"},"close":"Close","collapse":"Less","email":"Email","expand":"More","open":"Open","print":{"plain":"Print","with_item":"Print %{item}","with_item_html":"Print \u003cb\u003e%{item}\u003c/b\u003e"},"search":"Search"},"bathroom_amenities":{"AMENITY_BIDET":"Bidet","AMENITY_COMBO_TUB_SHOWER":"Combination tub/shower","AMENITY_JETTED_TUB":"Jetted tub","AMENITY_OUTDOOR_SHOWER":"Outdoor shower","AMENITY_SHOWER":"Shower","AMENITY_TOILET":"Toilet","AMENITY_TUB":"Tub"},"bathroom_type":{"full":"Full bathroom","half":"Half bathroom","shower":"Shower"},"bedroom_amenities":{"AMENITY_BUNK_BED":"Bunk bed%{s}","AMENITY_CHILD_BED":"Child's bed%{s}","AMENITY_CRIB":"Crib%{s}","AMENITY_DOUBLE":"Double bed%{s}","AMENITY_KING":"King bed%{s}","AMENITY_MURPHY_BED":"Murphy bed%{s}","AMENITY_QUEEN":"Queen bed%{s}","AMENITY_SLEEP_SOFA":"Sleeper sofa%{s}","AMENITY_TWIN_SINGLE":"Twin/single bed%{s}"},"bedroom_type":{"bedroom":"Bedroom","living_sleeping":"Living/sleeping area","other_sleeping":"Other sleeping area"},"features":{"features_accommodations":{"ACCOMMODATIONS_BREAKFAST_BOOKING_POSSIBLE":"Breakfast possible at booking","ACCOMMODATIONS_BREAKFAST_INCLUDED_IN_PRICE":"Breakfast included in price","ACCOMMODATIONS_BREAKFAST_NOT_AVAILABLE":"Breakfast not available","ACCOMMODATIONS_DINNER_BOOKING_POSSIBLE":"Dinner possible at booking","ACCOMMODATIONS_DINNER_INCLUDED_IN_PRICE":"Dinner included in price","ACCOMMODATIONS_DINNER_NOT_AVAILABLE":"Lunch not available","ACCOMMODATIONS_HOUSE_CLEANING_INCLUDED":"Housekeeping included","ACCOMMODATIONS_HOUSE_CLEANING_OPTIONAL":"Housekeeping optional","ACCOMMODATIONS_LUNCH_BOOKING_POSSIBLE":"Lunch possible at booking","ACCOMMODATIONS_LUNCH_INCLUDED_IN_PRICE":"Lunch included in price","ACCOMMODATIONS_LUNCH_NOT_AVAILABLE":"Lunch not available","ACCOMMODATIONS_MEALS_CATERING_AVAILABLE":"Catering available","ACCOMMODATIONS_MEALS_GUESTS_FURNISH_OWN":"Guests furnish own meals","ACCOMMODATIONS_OTHER_SERVICES_CAR_AVAILABLE":"Car available","ACCOMMODATIONS_OTHER_SERVICES_CHAUFFEUR":"Chauffeur","ACCOMMODATIONS_OTHER_SERVICES_CONCIERGE":"Concierge","ACCOMMODATIONS_OTHER_SERVICES_MASSAGE":"Massage","ACCOMMODATIONS_OTHER_SERVICES_PRIVATE_CHEF":"Private chef","ACCOMMODATIONS_OTHER_SERVICES_STAFF":"House staff","ACCOMMODATIONS_TYPE_BED_AND_BREAKFAST":"Bed and breakfast","ACCOMMODATIONS_TYPE_GUEST_HOUSE":"Guest house","ACCOMMODATIONS_TYPE_HOTEL":"Hotel","label":"Accommodations"},"features_adventure":{"SPORTS_BASKETBALL_COURT":"Basketball court","SPORTS_CROSS_COUNTRY_SKIING":"Cross-country skiing","SPORTS_CYCLING":"Cycling","SPORTS_DEEPSEA_FISHING":"Deep sea fishing","SPORTS_EQUESTRIAN_EVENTS":"Equestrian events","SPORTS_FISHING":"Fishing","SPORTS_FISHING_BAY":"Bay fishing","SPORTS_FISHING_FLY":"Fly fishing","SPORTS_FISHING_FRESHWATER":"Freshwater fishing","SPORTS_FISHING_PIER":"Pier fishing","SPORTS_FISHING_SURF":"Surf fishing","SPORTS_GOLF":"Golf","SPORTS_HIKING":"Hiking","SPORTS_HOT_AIR_BALLOONING":"Hot air ballooning","SPORTS_HUNTING":"Hunting","SPORTS_ICE_SKATING":"Ice skating","SPORTS_JET_SKIING":"Jet skiing","SPORTS_KAYAKING":"Kayaking","SPORTS_MOUNTAINEERING":"Mountaineering","SPORTS_MOUNTAIN_BIKING":"Mountain biking","SPORTS_MOUNTAIN_CLIMBING":"Mountain climbing","SPORTS_PARAGLIDING":"Paraglading","SPORTS_PARASAILING":"Parasailing","SPORTS_RACQUETBALL":"Racquetball","SPORTS_RAFTING":"Rafting","SPORTS_ROCK_CLIMBING":"Rock climbing","SPORTS_ROLLER_BLADING":"Roller blading","SPORTS_SAILING":"Sailing","SPORTS_SCUBA_OR_SNORKELING":"Scuba","SPORTS_SKIING":"Skiing","SPORTS_SKIING_WATER":"Water skiing","SPORTS_SKI_LIFT_PRIVILEGES":"Ski lift priveleges","SPORTS_SNORKELING":"Snorkeling","SPORTS_SNOWBOARDING":"Snowboarding","SPORTS_SNOWMOBILING":"Snowmobiling","SPORTS_SPELUNKING":"Spelunking","SPORTS_SURFING":"Surfing","SPORTS_SWIMMING":"Swimming","SPORTS_TENNIS":"Tennis","SPORTS_TUBING_WATER":"Tubing","SPORTS_WHITEWATER_RAFTING":"Whitewater rafting","SPORTS_WIND_SURFING":"Wind surfing","label":"Adventure"},"features_amenities":{"AMENITIES_AIR_CONDITIONING":"Air conditioning","AMENITIES_DRYER":"Dryer","AMENITIES_ELEVATOR":"Elevator","AMENITIES_ESSENTIALS":"Essentials","AMENITIES_FIREPLACE":"Fireplace","AMENITIES_FITNESS_ROOM":"Fitness room","AMENITIES_GAME_ROOM":"Game room","AMENITIES_GARAGE":"Garage","AMENITIES_HAIR_DRYER":"Hair dryer","AMENITIES_HEATING":"Heating","AMENITIES_IRON_BOARD":"Ironing board","AMENITIES_LINENS":"Linens","AMENITIES_LIVING_ROOM":"Living room","AMENITIES_PARKING":"Parking","AMENITIES_SHAMPOO":"Shampoo","AMENITIES_TELEPHONE":"Telephone","AMENITIES_TOWELS":"Towels","AMENITIES_WASHER":"Washer","AMENITIES_WIRELESS_INTERNET":"Internet","AMENITIES_WOOD_STOVE":"Wood stove","label":"Amenities"},"features_attractions":{"ATTRACTIONS_ARBORETUM":"Arboretum","ATTRACTIONS_AUTUMN_FOLIAGE":"Autumn foliage","ATTRACTIONS_BAY":"Bay","ATTRACTIONS_BOTANICAL_GARDEN":"Botanical garden","ATTRACTIONS_CAVE":"Cave","ATTRACTIONS_CHURCHES":"Church","ATTRACTIONS_CINEMAS":"Cinema","ATTRACTIONS_COIN_LAUNDRY":"Coin laundry","ATTRACTIONS_DUTY_FREE":"Duty-free","ATTRACTIONS_FESTIVALS":"Festival","ATTRACTIONS_FORESTS":"Forest","ATTRACTIONS_HEALTH_BEAUTY_SPA":"Beauty spa","ATTRACTIONS_LIBRARY":"Library","ATTRACTIONS_LIVE_THEATER":"Live theater","ATTRACTIONS_MARINA":"Marina","ATTRACTIONS_MUSEUMS":"Museum","ATTRACTIONS_NUDE_BEACH":"Nude beach","ATTRACTIONS_PLAYGROUND":"Playground","ATTRACTIONS_POND":"Pond","ATTRACTIONS_RAIN_FORESTS":"Rainforests","ATTRACTIONS_REC_CENTER":"Rec center","ATTRACTIONS_REEF":"Reef","ATTRACTIONS_RESTAURANTS":"Restaurants","ATTRACTIONS_RUINS":"Ruins","ATTRACTIONS_SYNAGOGUES":"Synagogue","ATTRACTIONS_THEME_PARKS":"Theme park","ATTRACTIONS_VOLCANO":"Volcano","ATTRACTIONS_WATERFALLS":"Waterfalls","ATTRACTIONS_WATER_PARKS":"Water park","ATTRACTIONS_WINERY_TOURS":"Winery tour","ATTRACTIONS_ZOO":"Zoo","label":"Attractions"},"features_car":{"CAR_NECESSARY":"Necessary","CAR_NOT_NECESSARY":"Not necessary","CAR_RECOMMENDED":"Recommended","label":"Car"},"features_dining":{"KITCHEN_DINING_AREA":"Dining area","KITCHEN_DINING_COFFEE_MAKER":"Coffee maker","KITCHEN_DINING_DISHES_UTENSILS":"Utensils","KITCHEN_DINING_DISHWASHER":"Dishwasher","KITCHEN_DINING_HIGHCHAIR":"High chair","KITCHEN_DINING_KITCHEN":"Kitchen","KITCHEN_DINING_MICROWAVE":"Microwave","KITCHEN_DINING_OVEN":"Oven","KITCHEN_DINING_RACLETTE":"Raclette","KITCHEN_DINING_REFRIGERATOR":"Refridgerator","KITCHEN_DINING_ROOM":"Dining room","KITCHEN_DINING_SPICES":"Spices","KITCHEN_DINING_STOVE":"Stove","KITCHEN_DINING_TOASTER":"Toaster","label":"Dining"},"features_entertainment":{"ENTERTAINMENT_BOOKS":"Books","ENTERTAINMENT_DVD":"DVD Player","ENTERTAINMENT_FOOSBALL":"Foosball","ENTERTAINMENT_GAMES":"Games","ENTERTAINMENT_MUSIC_LIBRARY":"Music library","ENTERTAINMENT_PING_PONG_TABLE":"Ping-pong table","ENTERTAINMENT_POOL_TABLE":"Pool table","ENTERTAINMENT_SATELLITE_OR_CABLE":"Satellite/cable television","ENTERTAINMENT_STEREO":"Stereo","ENTERTAINMENT_TELEVISION":"Television","ENTERTAINMENT_TOYS":"Toys","ENTERTAINMENT_VIDEO_GAMES":"Video games","ENTERTAINMENT_VIDEO_LIBRARY":"Video library","label":"Entertainment"},"features_leisure":{"LEISURE_ANTIQUING":"Antiquing","LEISURE_BEACHCOMBING":"Beachcombing","LEISURE_BIRD_WATCHING":"Bird watching","LEISURE_BOATING":"Boating","LEISURE_BOWLING":"Bowling","LEISURE_DISCO":"Disco","LEISURE_ECO_TOURISM":"Eco-tourism","LEISURE_GAMBLING":"Gambling","LEISURE_HORSEBACK_RIDING":"Horseback riding","LEISURE_HORSESHOES":"Horseshoes","LEISURE_LUAUS":"Luau","LEISURE_MINIATURE_GOLF":"Miniature golf","LEISURE_NATURISME":"Naturism","LEISURE_OUTLET_SHOPPING":"Outlet shopping","LEISURE_PADDLE_BOATING":"Paddle boating","LEISURE_PHOTOGRAPHY":"Photography","LEISURE_SCENIC_DRIVES":"Scenic drive","LEISURE_SHELLING":"Shelling","LEISURE_SHOPPING":"Shopping","LEISURE_SHUFFLEBOARD":"Shuffleboard","LEISURE_SIGHT_SEEING":"Sightseeing","LEISURE_SLEDDING":"Sledding","LEISURE_THALASSOTHERAPY":"Thalassotherapy","LEISURE_THERMALISME":"Thermalism","LEISURE_WALKING":"Walking","LEISURE_WATER_SPORTS":"Water sports","LEISURE_WHALE_WATCHING":"Whale watching","LEISURE_WILDLIFE_VIEWING":"Wildlife viewing","label":"Leisure"},"features_local":{"LOCAL_ATM_BANK":"ATM","LOCAL_BABYSITTING":"Babysitting","LOCAL_FITNESS_CENTER":"Fitness center","LOCAL_GROCERIES":"Groceries","LOCAL_HOSPITAL":"Hospital","LOCAL_LAUNDROMAT":"Laundromat","LOCAL_MASSAGE_THERAPIST":"Massage therapist","LOCAL_MEDICAL_SERVICES":"Medical services","label":"Local"},"features_location":{"LOCATION_TYPE_BEACH":"Beach","LOCATION_TYPE_BEACH_FRONT":"Beachfront","LOCATION_TYPE_BEACH_VIEW":"Beach view","LOCATION_TYPE_DOWNTOWN":"Downtown","LOCATION_TYPE_GOLF_COURSE_FRONT":"On golf course","LOCATION_TYPE_GOLF_COURSE_VIEW":"Golf course view","LOCATION_TYPE_LAKE":"Lake","LOCATION_TYPE_LAKE_FRONT":"Lakefront","LOCATION_TYPE_LAKE_VIEW":"Lake view","LOCATION_TYPE_MONUMENT_VIEW":"Monument view","LOCATION_TYPE_MOUNTAIN":"Mountain","LOCATION_TYPE_MOUNTAIN_VIEW":"Mountain view","LOCATION_TYPE_NEAR_OCEAN":"Near ocean","LOCATION_TYPE_OCEAN_FRONT":"Oceanfront","LOCATION_TYPE_OCEAN_VIEW":"Ocean view","LOCATION_TYPE_RESORT":"Resort","LOCATION_TYPE_RIVER":"River","LOCATION_TYPE_RURAL":"Rural","LOCATION_TYPE_SKI_IN":"Ski-in","LOCATION_TYPE_SKI_OUT":"Ski-out","LOCATION_TYPE_TOWN":"Town","LOCATION_TYPE_VILLAGE":"Village","LOCATION_TYPE_WATERFRONT":"Waterfront","LOCATION_TYPE_WATER_VIEW":"Water view","label":"Location"},"features_outdoor":{"OUTDOOR_BALCONY":"Balcony","OUTDOOR_BEACH_ESSENTIALS":"Beach Essentials","OUTDOOR_BICYCLE":"Bicycle","OUTDOOR_BOAT":"Boat","OUTDOOR_DECK_PATIO_UNCOVERED":"Patio","OUTDOOR_GARDEN":"Garden","OUTDOOR_GOLF":"Golf","OUTDOOR_GOLF_CART":"Golf Cart","OUTDOOR_GRILL":"Grill","OUTDOOR_KAYAK_CANOE":"Kayak/canoe","OUTDOOR_LANAI_GAZEBO_COVERED":"Gazebo","OUTDOOR_PETANQUE":"Petanque","OUTDOOR_SNOW_SPORTS_GEAR":"Snow sports gear","OUTDOOR_TENNIS":"Tennis","OUTDOOR_VERANDA":"Veranda","OUTDOOR_WATER_SPORTS_GEAR":"Water sports gear","label":"Outdoor"},"features_spa":{"POOL_SPA_COMMUNAL_POOL":"Communal pool","POOL_SPA_HEATED_POOL":"Heated pool","POOL_SPA_HOT_TUB":"Hot tub","POOL_SPA_INDOOR_POOL":"Indoor pool","POOL_SPA_PRIVATE_POOL":"Private pool","POOL_SPA_SAUNA":"Sauna","label":"Spa"},"features_suitability":{"SUITABILITY_ACCESSIBILITY_LIMITED_ACCESSIBILITY":"Limited accesibility","SUITABILITY_ACCESSIBILITY_WHEELCHAIR_ACCESSIBLE":"Wheelchair accessible","SUITABILITY_ACCESSIBILITY_WHEELCHAIR_INACCESSIBLE":"Wheelchair inaccessible","SUITABILITY_CARBON_MONOXIDE_DETECTOR":"Carbon monoxide detector","SUITABILITY_CHILDREN_NOT_ALLOWED":"Children not allowed","SUITABILITY_CHILDREN_WELCOME":"Children welcome","SUITABILITY_EVENTS_PARTIES_ALLOWED":"Parties/events allowed","SUITABILITY_MINIMUM_AGE_LIMIT":"Minimum age limit","SUITABILITY_OTHER_EVENTS_ALLOWED":"Event rental","SUITABILITY_OTHER_LONG_TERM_RENTERS":"Long-term rental","SUITABILITY_PETS_CONSIDERED":"Pets considered","SUITABILITY_PETS_NOT_ALLOWED":"Pets not allowed","SUITABILITY_PRIVATE_ENTRANCE":"Private Entrance","SUITABILITY_SENIOR_ADULTS_ONLY":"Adults-only","SUITABILITY_SMOKE_DETECTOR":"Smoke detector","SUITABILITY_SMOKING_ALLOWED":"Smoking allowed","SUITABILITY_SMOKING_NOT_ALLOWED":"Smoking prohibited","label":"Suitability"},"features_themes":{"THEMES_ADVENTURE":"Adventure","THEMES_AWAY_FROM_IT_ALL":"Away-from-it-all","THEMES_BUDGET":"Budget","THEMES_FAMILY":"Family","THEMES_FARM_HOLIDAYS":"Farm","THEMES_HISTORIC":"Historic","THEMES_HOLIDAY_COMPLEX":"Resort complex","THEMES_ROMANTIC":"Romantic","THEMES_SPA":"Spa","THEMES_SPORTS_ACTIVITIES":"Sports activities","THEMES_TOURIST_ATTRACTIONS":"Tourist attractions","label":"Themes"}},"menu":"Menu","parsers":{"currency":{"aud":"AU$%{value}","brl":"R$%{value}","cad":"CA$%{value}","chf":"CHF%{value}","clp":"$%{value}","cny":"CN¥%{value}","eur":"€%{value}","gbp":"£%{value}","hkd":"HK$%{value}","inr":"₹%{value}","jpy":"¥%{value}","krw":"₩%{value}","mxn":"MX$%{value}","nok":"Nkr%{value}","nzd":"NZ$%{value}","rub":"RUB%{value}","sek":"Skr%{value}","sgd":"S$%{value}","try":"TL%{value}","usd":"$%{value}","zar":"R%{value}"},"currency_avg":{"aud":"AU$%{value} avg.","brl":"R$%{value} avg.","cad":"CA$%{value} avg.","chf":"CHF%{value} avg.","clp":"$%{value} avg.","cny":"CN¥%{value} avg.","eur":"€%{value} avg.","gbp":"£%{value} avg.","hkd":"HK$%{value} avg.","inr":"Rs%{value} avg.","jpy":"¥%{value} avg.","krw":"₩%{value} avg.","mxn":"MX$%{value} avg.","nok":"Nkr%{value} avg.","nzd":"NZ$%{value} avg.","rub":"RUB%{value} avg.","sek":"Skr%{value} avg.","sgd":"S$%{value} avg.","try":"TL%{value} avg.","usd":"$%{value} avg.","zar":"R%{value} avg."},"currency_avg_night":{"aud":"Avg. AU$%{value} / night","brl":"Avg. R$%{value} / night","cad":"Avg. CA$%{value} / night","chf":"Avg. CHF%{value} / night","clp":"Avg. $%{value} / night","cny":"Avg. CN¥%{value} / night","eur":"Avg. €%{value} / night","gbp":"Avg. £%{value} / night","hkd":"Avg. HK$%{value} / night","inr":"Avg. Rs%{value} / night","jpy":"Avg. ¥%{value} / night","krw":"Avg. ₩%{value} / night","mxn":"Avg. MX$%{value} / night","nok":"Avg. Nkr%{value} / night","nzd":"Avg. NZ$%{value} / night","rub":"Avg. RUB%{value} / night","sek":"Avg. Skr%{value} / night","sgd":"Avg. S$%{value} / night","try":"Avg. TL%{value} / night","usd":"Avg. $%{value} / night","zar":"Avg. R%{value} / night"},"discount":{"monthly":"%{value}% monthly discount","weekly":"%{value}% weekly discount"},"num_bathrooms":{"plural":"%{num}+ bathrooms","single":"%{num}+ bathroom"},"num_bathrooms_short":{"plural":"%{num}+ baths","singe":"%{num}+ bath"},"num_bedrooms":{"plural":"%{num}+ bedrooms","single":"%{num}+ bedroom"},"num_bedrooms_short":{"plural":"%{num}+ beds","singe":"%{num}+ bed"},"num_guests":{"plural":"%{num} guests","single":"%{num} guest"},"num_nights":{"plural":"%{nights} nights","single":"%{nights} night"}},"property_type":{"apartment":"Apartment","apartment_building":"Apartment Building","barn":"Barn","bnb":"Bed and Breakfast","bnb_unit":"Bed and Breakfast Unit","boat":"Boat","building":"Building","bungalow":"Bungalow","cabin":"Cabin","caravan":"Caravan","castle":"Castle","chacara":"Chacara","chalet":"Chalet","chateau":"Chateau","condo":"Condo","condo_building":"Condo Building","condo_hotel":"Condo Hotel","condo_hotel_unit":"Condo Hotel Unit","cottage":"Cottage","estate":"Estate","farmhouse":"Farmhouse","guesthouse":"Guesthouse","hotel":"Hotel","hotel_unit":"Hotel Room","house":"House","house_boat":"Houseboat","lodge":"Lodge","mas":"Mas","mill":"Mill","mobile_home":"Mobile Home","recreational_vehicle":"RV","riad":"Riad","studio":"Studio","tower":"Tower","townhome":"Townhome","villa":"Villa","yacht":"Yacht"},"refund_policy":{"custom":{"details":"This listing has a custom cancellation policy.","label":"Custom Cancellation Policy"},"day30":{"details":"Bookings must be cancelled at least 30 days before the check-in date to receive a full refund. Any cancellations made after 11:59 p.m. on the 30th day prior to check-in may no longer be eligible for a refund.","label":"30 Days Prior"},"day45":{"details":"Bookings must be cancelled at least 45 days before the check-in date to receive a full refund. Any cancellations made after 11:59 p.m. on the 45th day prior to check-in may no longer be eligible for a refund.","label":"45 Days Prior"},"day60":{"details":"Bookings must be cancelled at least 60 days before the check-in date to receive a full refund. Any cancellations made after 11:59 p.m. on the 60th day prior to check-in may no longer be eligible for a refund.","label":"60 Days Prior"},"day7":{"details":"Bookings must be cancelled at least 7 days before the check-in date to receive a full refund. Any cancellations made after 11:59 p.m. on the 7th day prior to check-in may no longer be eligible for a refund.","label":"7 Days Prior"},"day90":{"details":"Bookings must be cancelled at least 90 days before the check-in date to receive a full refund. Any cancellations made after 11:59 p.m. on the 90th day prior to check-in may no longer be eligible for a refund.","label":"90 Days Prior"},"deposit_partial":{"details":"Deposits are partially refundable based on property policies.","label":"Partial Refund"},"full":{"details":"Bookings may be cancelled at any time prior to check-in and will be eligible for a full refund.","label":"Full Refund"},"no_refund":{"details":"Cancelled bookings are not eligible for a refund.","label":"No Refund"}},"unit_type":{"apartment":"Apartment","apartment_building":"Apartment Building","barn":"Barn","bnb":"Bed and Breakfast","bnb_unit":"Bed and Breakfast Unit","boat":"Boat","building":"Building","bungalow":"Bungalow","cabin":"Cabin","caravan":"Caravan","castle":"Castle","chacara":"Chacara","chalet":"Chalet","chateau":"Chateau","condo":"Condo","condo_building":"Condo Building","condo_hotel":"Condo Hotel","condo_hotel_unit":"Condo Hotel Unit","cottage":"Cottage","estate":"Estate","farmhouse":"Farmhouse","guesthouse":"Guesthouse","hotel":"Hotel","hotel_unit":"Hotel Room","house":"House","house_boat":"Houseboat","lodge":"Lodge","mas":"Mas","mill":"Mill","mobile_home":"Mobile Home","recreational_vehicle":"RV","riad":"Riad","studio":"Studio","tower":"Tower","townhome":"Townhome","villa":"Villa","yacht":"Yacht"}},"helpers":{"select":{"prompt":"Please select"},"submit":{"create":"Create %{model}","submit":"Save %{model}","update":"Update %{model}"}},"number":{"currency":{"format":{"delimiter":",","format":"%u%n","precision":2,"separator":".","significant":false,"strip_insignificant_zeros":false,"unit":"$"}},"format":{"delimiter":",","precision":3,"separator":".","significant":false,"strip_insignificant_zeros":false},"human":{"decimal_units":{"format":"%n %u","units":{"billion":"Billion","million":"Million","quadrillion":"Quadrillion","thousand":"Thousand","trillion":"Trillion","unit":""}},"format":{"delimiter":"","precision":3,"significant":true,"strip_insignificant_zeros":true},"storage_units":{"format":"%n %u","units":{"byte":{"one":"Byte","other":"Bytes"},"eb":"EB","gb":"GB","kb":"KB","mb":"MB","pb":"PB","tb":"TB"}}},"nth":{"ordinalized":{},"ordinals":{}},"percentage":{"format":{"delimiter":"","format":"%n%"}},"precision":{"format":{"delimiter":""}}},"support":{"array":{"last_word_connector":", and ","two_words_connector":" and ","words_connector":", "}},"time":{"am":"am","formats":{"default":"%a, %d %b %Y %H:%M:%S %z","long":"%B %d, %Y %H:%M","short":"%d %b %H:%M"},"pm":"pm"}});
