# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_27_125304) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "access_role_permissions", id: :serial, force: :cascade do |t|
    t.boolean "value"
    t.integer "access_role_id"
    t.integer "permission_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["access_role_id"], name: "index_access_role_permissions_on_access_role_id"
    t.index ["organization_id"], name: "index_access_role_permissions_on_organization_id"
    t.index ["permission_id"], name: "index_access_role_permissions_on_permission_id"
  end

  create_table "access_roles", id: :serial, force: :cascade do |t|
    t.string "name"
    t.boolean "system_role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_access_roles_on_organization_id"
  end

  create_table "adjustments", id: :serial, force: :cascade do |t|
    t.integer "amount_cents"
    t.string "note"
    t.string "reason"
    t.integer "adjustment_type"
    t.string "adjustable_type"
    t.integer "adjustable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["adjustable_type", "adjustable_id"], name: "index_adjustments_on_adjustable_type_and_adjustable_id"
    t.index ["organization_id"], name: "index_adjustments_on_organization_id"
  end

  create_table "airbnb_batch_fee_charges", id: :serial, force: :cascade do |t|
    t.integer "total_cents", default: 0
    t.integer "currency"
    t.string "stripe_charge_id"
    t.jsonb "booking_data", default: {}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "airbnb_channel_mappings", id: :serial, force: :cascade do |t|
    t.integer "organization_id"
    t.integer "channel_mapping_id"
    t.string "airbnb_id"
    t.index ["organization_id"], name: "index_airbnb_channel_mappings_on_organization_id"
  end

  create_table "airbnb_notifications", id: :serial, force: :cascade do |t|
    t.jsonb "data"
    t.string "endpoint"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_airbnb_notifications_on_organization_id"
  end

  create_table "bathrooms", id: :serial, force: :cascade do |t|
    t.integer "bathroom_type"
    t.text "amenities"
    t.integer "unit_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_bathrooms_on_organization_id"
    t.index ["unit_id"], name: "index_bathrooms_on_unit_id"
  end

  create_table "bedrooms", id: :serial, force: :cascade do |t|
    t.integer "bedroom_type"
    t.text "amenities"
    t.integer "unit_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_bedrooms_on_organization_id"
    t.index ["unit_id"], name: "index_bedrooms_on_unit_id"
  end

  create_table "booking_com_temps", id: :serial, force: :cascade do |t|
    t.integer "property_id"
    t.integer "unit_id"
    t.float "rate_increase"
    t.string "leid"
    t.string "hotel_code"
    t.string "room_code"
    t.string "rate_plan_code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "channel_url"
    t.datetime "last_sync_at"
    t.boolean "enabled"
    t.string "status"
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_booking_com_temps_on_organization_id"
    t.index ["property_id"], name: "index_booking_com_temps_on_property_id"
    t.index ["unit_id"], name: "index_booking_com_temps_on_unit_id"
  end

  create_table "booking_net_details", id: :serial, force: :cascade do |t|
    t.integer "quote_id"
    t.integer "final_net_cents", default: 0
    t.integer "payouts_cents", default: 0
    t.integer "system_fees_cents", default: 0
    t.integer "other_fees_cents", default: 0
    t.integer "taxes_cents", default: 0
    t.integer "collected_cents", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "booking_total_cents", default: 0
    t.string "booking_code"
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_booking_net_details_on_organization_id"
    t.index ["quote_id"], name: "index_booking_net_details_on_quote_id"
  end

  create_table "booking_net_overrides", id: :serial, force: :cascade do |t|
    t.integer "booking_net_detail_id"
    t.jsonb "net_change", default: {}
    t.string "line_item_code", default: ""
    t.jsonb "previous_value", default: {}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["booking_net_detail_id"], name: "index_booking_net_overrides_on_booking_net_detail_id"
    t.index ["organization_id"], name: "index_booking_net_overrides_on_organization_id"
  end

  create_table "booking_rate_plans", id: :serial, force: :cascade do |t|
    t.integer "property_id"
    t.integer "rate_plan_code"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_booking_rate_plans_on_organization_id"
    t.index ["property_id"], name: "index_booking_rate_plans_on_property_id"
  end

  create_table "bookings", id: :serial, force: :cascade do |t|
    t.string "booking_code"
    t.boolean "archived", default: false
    t.boolean "cancelled", default: false
    t.boolean "confirmed"
    t.integer "num_guests"
    t.string "price_breakdown"
    t.decimal "price_total"
    t.decimal "price_paid"
    t.integer "unit_listing_id"
    t.string "booking_range"
    t.string "notes"
    t.string "stripe_customer_id"
    t.date "check_in"
    t.date "check_out"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "customer_id"
    t.integer "paid_status_override_flag"
    t.integer "channel_id"
    t.string "external_id"
    t.boolean "charges_pending", default: false
    t.string "type"
    t.decimal "processing_fee"
    t.integer "subtotal"
    t.integer "direct_fee"
    t.integer "org_total"
    t.integer "stripe_fee"
    t.integer "owner_total"
    t.integer "quote_id"
    t.jsonb "stripe_transfers", default: []
    t.integer "creation_method", default: 0
    t.integer "booking_type", default: 0
    t.integer "generated_as_type"
    t.string "external_contract_code"
    t.string "door_code"
    t.integer "split_booking_id"
    t.integer "organization_id"
    t.boolean "channel_updatable", default: true
    t.integer "homeaway_cancellation_reservation_status"
    t.boolean "owner_self_clean", default: false
    t.date "invalid_card_enqued"
    t.index ["channel_id"], name: "index_bookings_on_channel_id"
    t.index ["customer_id"], name: "index_bookings_on_customer_id"
    t.index ["organization_id"], name: "index_bookings_on_organization_id"
    t.index ["quote_id"], name: "index_bookings_on_quote_id"
    t.index ["unit_listing_id"], name: "index_bookings_on_unit_listing_id"
  end

  create_table "bookings_fees", id: false, force: :cascade do |t|
    t.integer "booking_id", null: false
    t.integer "fee_id", null: false
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_bookings_fees_on_organization_id"
  end

  create_table "brand_footers", id: :serial, force: :cascade do |t|
    t.jsonb "sections"
    t.jsonb "credit_cards"
    t.integer "brand_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "intercom_id"
    t.integer "organization_id"
    t.text "custom_html"
    t.index ["brand_id"], name: "index_brand_footers_on_brand_id"
    t.index ["organization_id"], name: "index_brand_footers_on_organization_id"
  end

  create_table "brand_headers", id: :serial, force: :cascade do |t|
    t.integer "brand_id"
    t.jsonb "meta_tags"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "custom_html"
    t.index ["brand_id"], name: "index_brand_headers_on_brand_id"
  end

  create_table "brand_home_pages", id: :serial, force: :cascade do |t|
    t.integer "template"
    t.integer "brand_id"
    t.json "payload"
    t.string "options"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["brand_id"], name: "index_brand_home_pages_on_brand_id"
    t.index ["organization_id"], name: "index_brand_home_pages_on_organization_id"
  end

  create_table "brand_infos", id: :serial, force: :cascade do |t|
    t.integer "theme"
    t.integer "brand_id"
    t.text "colors"
    t.text "contact"
    t.text "css_override"
    t.text "fonts"
    t.text "social"
    t.string "google_analytics"
    t.string "logo_image"
    t.boolean "logo_image_processing", default: false, null: false
    t.string "favicon_image"
    t.boolean "favicon_image_processing", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "copyright"
    t.string "from_email"
    t.text "signature"
    t.integer "organization_id"
    t.string "robots"
    t.string "robots_name"
    t.text "scripts_override"
    t.text "custom_hero_html"
    t.boolean "bootstrap4", default: false
    t.string "body_class"
    t.index ["brand_id"], name: "index_brand_infos_on_brand_id"
    t.index ["organization_id"], name: "index_brand_infos_on_organization_id"
  end

  create_table "brand_pages", id: :serial, force: :cascade do |t|
    t.integer "template"
    t.integer "brand_id"
    t.string "title"
    t.string "description"
    t.string "slug"
    t.json "payload"
    t.boolean "featured", default: false, null: false
    t.boolean "published", default: false, null: false
    t.datetime "published_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "contact_form", default: false
    t.integer "organization_id"
    t.text "css_override"
    t.text "scripts_override"
    t.index ["brand_id"], name: "index_brand_pages_on_brand_id"
    t.index ["organization_id"], name: "index_brand_pages_on_organization_id"
  end

  create_table "brands", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "currency"
    t.integer "language"
    t.float "tax_rate"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "verify_signature", default: false
    t.boolean "verify_image", default: false
    t.text "verify_image_description"
    t.string "date_format", default: "MM/DD/YYYY"
    t.boolean "default", default: false
    t.index ["organization_id"], name: "index_brands_on_organization_id"
  end

  create_table "brands_employees", id: false, force: :cascade do |t|
    t.integer "employee_id", null: false
    t.integer "brand_id", null: false
  end

  create_table "channel_logs", id: :serial, force: :cascade do |t|
    t.jsonb "data"
    t.integer "log_type", default: 0
    t.integer "channel_id"
    t.string "loggable_type"
    t.integer "loggable_id"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id"], name: "index_channel_logs_on_channel_id"
    t.index ["loggable_type", "loggable_id"], name: "index_channel_logs_on_loggable_type_and_loggable_id"
    t.index ["organization_id"], name: "index_channel_logs_on_organization_id"
  end

  create_table "channel_mappings", id: :serial, force: :cascade do |t|
    t.string "mappable_type"
    t.integer "mappable_id"
    t.jsonb "channel_data"
    t.integer "channel_id"
    t.integer "status"
    t.boolean "visible"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.string "direct_mapping_id", default: ""
    t.index ["channel_id"], name: "index_channel_mappings_on_channel_id"
    t.index ["mappable_type", "mappable_id"], name: "index_channel_mappings_on_mappable_type_and_mappable_id"
    t.index ["organization_id"], name: "index_channel_mappings_on_organization_id"
  end

  create_table "channel_users", id: :serial, force: :cascade do |t|
    t.string "external_user_id"
    t.string "direct_user_type"
    t.integer "direct_user_id"
    t.integer "channel_id"
    t.integer "organization_id"
    t.index ["channel_id"], name: "index_channel_users_on_channel_id"
    t.index ["direct_user_type", "direct_user_id"], name: "index_channel_users_on_direct_user_type_and_direct_user_id"
    t.index ["organization_id"], name: "index_channel_users_on_organization_id"
  end

  create_table "channels", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "logo_url"
    t.text "description"
    t.float "booking_fee"
    t.string "listing_fee"
    t.boolean "active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "logo_mark_url"
  end

  create_table "charges", id: :serial, force: :cascade do |t|
    t.integer "booking_id"
    t.integer "coupon_id"
    t.string "cc_brand"
    t.string "cc_exp_month"
    t.string "cc_exp_year"
    t.string "cc_last_4"
    t.string "stripe_charge_id"
    t.string "stripe_customer_id"
    t.integer "status"
    t.decimal "amount_charged"
    t.string "currency"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "is_security_deposit"
    t.text "note"
    t.integer "charge_type", default: 0
    t.integer "organization_id"
    t.index ["booking_id"], name: "index_charges_on_booking_id"
    t.index ["coupon_id"], name: "index_charges_on_coupon_id"
    t.index ["organization_id"], name: "index_charges_on_organization_id"
  end

  create_table "conversations", id: :serial, force: :cascade do |t|
    t.string "subject"
    t.integer "booking_id"
    t.integer "unit_id"
    t.integer "unit_listing_id"
    t.integer "channel_id"
    t.integer "property_id"
    t.integer "customer_id"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "removed_users", default: [], array: true
    t.text "removed_employees", default: [], array: true
    t.text "removed_customers", default: [], array: true
    t.string "external_id"
    t.jsonb "additional_data", default: {}
    t.boolean "is_airbnb_pre_approved", default: false
    t.index ["organization_id"], name: "index_conversations_on_organization_id"
  end

  create_table "coupons", id: :serial, force: :cascade do |t|
    t.string "code"
    t.integer "calculation_type"
    t.decimal "calculation_amount"
    t.datetime "begins_at"
    t.datetime "expires_at"
    t.string "description"
    t.integer "brand_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["brand_id"], name: "index_coupons_on_brand_id"
    t.index ["organization_id"], name: "index_coupons_on_organization_id"
  end

  create_table "csv_imports", id: :serial, force: :cascade do |t|
    t.string "external_id"
    t.integer "direct_object_id"
    t.jsonb "data"
    t.string "direct_type"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "importable_type"
    t.integer "importable_id"
    t.integer "organization_id"
    t.integer "master_csv_id"
    t.index ["importable_type", "importable_id"], name: "index_csv_imports_on_importable_type_and_importable_id"
    t.index ["organization_id"], name: "index_csv_imports_on_organization_id"
  end

  create_table "customers", id: :serial, force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "name", default: "", null: false
    t.string "avatar", default: ""
    t.boolean "avatar_processing", default: false, null: false
    t.string "telephone"
    t.string "postal_code"
    t.string "stripe_customer_id"
    t.date "birthdate"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "provider"
    t.string "uid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "age_verified", default: false
    t.integer "tag"
    t.integer "organization_id"
    t.string "adr_street"
    t.string "adr_city"
    t.string "adr_country"
    t.string "adr_state"
    t.string "adr_zip"
    t.index ["email"], name: "index_customers_on_email", unique: true
    t.index ["organization_id"], name: "index_customers_on_organization_id"
    t.index ["reset_password_token"], name: "index_customers_on_reset_password_token", unique: true
  end

  create_table "deduction_accounts", id: :serial, force: :cascade do |t|
    t.integer "organization_id"
    t.string "name"
    t.text "description"
    t.integer "unit_listing_id"
    t.integer "calculation_type", default: 0
    t.decimal "calculation_amount"
    t.boolean "variable", default: false
    t.integer "frequency", default: 0
    t.integer "realization_type", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_deduction_accounts_on_organization_id"
  end

  create_table "deductions", id: :serial, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "unit_listing_id"
    t.integer "calculation_type"
    t.decimal "calculation_amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "frequency"
    t.integer "organization_id"
    t.integer "unit_pricing_id"
    t.integer "deduction_account_id"
    t.integer "realization_type", default: 0
    t.index ["deduction_account_id"], name: "index_deductions_on_deduction_account_id"
    t.index ["organization_id"], name: "index_deductions_on_organization_id"
    t.index ["unit_pricing_id"], name: "index_deductions_on_unit_pricing_id"
  end

  create_table "deposits", id: :serial, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "unit_listing_id"
    t.integer "calculation_type"
    t.decimal "calculation_amount"
    t.boolean "refundable"
    t.boolean "taxable"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "remaining_balance_due_date", default: 0
    t.string "is_security_deposit", default: "false"
    t.integer "security_deposit_authorization", default: 0
    t.integer "organization_id"
    t.integer "unit_pricing_id"
    t.boolean "auto_process_payments", default: true
    t.index ["organization_id"], name: "index_deposits_on_organization_id"
    t.index ["unit_listing_id"], name: "index_deposits_on_unit_listing_id"
    t.index ["unit_pricing_id"], name: "index_deposits_on_unit_pricing_id"
  end

  create_table "documents", id: :serial, force: :cascade do |t|
    t.string "document"
    t.string "documentable_type"
    t.integer "documentable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["documentable_type", "documentable_id"], name: "index_documents_on_documentable_type_and_documentable_id"
    t.index ["organization_id"], name: "index_documents_on_organization_id"
  end

  create_table "domains", id: :serial, force: :cascade do |t|
    t.string "url"
    t.boolean "live"
    t.boolean "heroku_wired"
    t.string "heroku_dns"
    t.integer "brand_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["brand_id"], name: "index_domains_on_brand_id"
    t.index ["organization_id"], name: "index_domains_on_organization_id"
  end

  create_table "email_receipts", id: :serial, force: :cascade do |t|
    t.integer "notification_id"
    t.string "recipient_type"
    t.integer "recipient_id"
    t.integer "booking_id"
    t.datetime "sent_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["booking_id"], name: "index_email_receipts_on_booking_id"
    t.index ["notification_id"], name: "index_email_receipts_on_notification_id"
    t.index ["organization_id"], name: "index_email_receipts_on_organization_id"
    t.index ["recipient_type", "recipient_id"], name: "index_email_receipts_on_recipient_type_and_recipient_id"
  end

  create_table "employee_access_roles", id: :serial, force: :cascade do |t|
    t.integer "employee_id"
    t.integer "access_role_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["access_role_id"], name: "index_employee_access_roles_on_access_role_id"
    t.index ["employee_id"], name: "index_employee_access_roles_on_employee_id"
    t.index ["organization_id"], name: "index_employee_access_roles_on_organization_id"
  end

  create_table "employee_permissions", id: :serial, force: :cascade do |t|
    t.boolean "value"
    t.integer "employee_id"
    t.integer "permission_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["employee_id"], name: "index_employee_permissions_on_employee_id"
    t.index ["organization_id"], name: "index_employee_permissions_on_organization_id"
    t.index ["permission_id"], name: "index_employee_permissions_on_permission_id"
  end

  create_table "employee_portfolios", id: :serial, force: :cascade do |t|
    t.integer "employee_id"
    t.string "manageable_type"
    t.integer "manageable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["employee_id"], name: "index_employee_portfolios_on_employee_id"
    t.index ["manageable_type", "manageable_id"], name: "index_employee_portfolios_on_manageable_type_and_manageable_id"
    t.index ["organization_id"], name: "index_employee_portfolios_on_organization_id"
  end

  create_table "employee_unit_contracts", id: :serial, force: :cascade do |t|
    t.integer "employee_unit_id"
    t.decimal "margin", precision: 5, scale: 4
    t.date "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "start_date"
    t.integer "organization_id"
    t.index ["employee_unit_id"], name: "index_employee_unit_contracts_on_employee_unit_id"
    t.index ["organization_id"], name: "index_employee_unit_contracts_on_organization_id"
  end

  create_table "employee_units", id: :serial, force: :cascade do |t|
    t.integer "employee_id"
    t.integer "unit_id"
    t.decimal "margin", precision: 5, scale: 4
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["employee_id"], name: "index_employee_units_on_employee_id"
    t.index ["organization_id"], name: "index_employee_units_on_organization_id"
    t.index ["unit_id"], name: "index_employee_units_on_unit_id"
  end

  create_table "employees", id: :serial, force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "name", default: "", null: false
    t.string "avatar", default: ""
    t.boolean "avatar_processing", default: false, null: false
    t.string "telephone", default: ""
    t.text "languages"
    t.integer "role"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.decimal "margin", default: "0.0", null: false
    t.string "auth_token"
    t.string "stripe_account_id"
    t.string "notes"
    t.boolean "needs_confirmation", default: true
    t.integer "payout_frequency", default: 0
    t.boolean "payee_active", default: true
    t.string "business_name"
    t.boolean "split_booking_override"
    t.boolean "early_payout", default: false
    t.boolean "user_active", default: true
    t.index ["email"], name: "index_employees_on_email", unique: true
    t.index ["organization_id"], name: "index_employees_on_organization_id"
    t.index ["reset_password_token"], name: "index_employees_on_reset_password_token", unique: true
  end

  create_table "employees_properties", id: false, force: :cascade do |t|
    t.integer "employee_id", null: false
    t.integer "property_id", null: false
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_employees_properties_on_organization_id"
  end

  create_table "employees_units", id: false, force: :cascade do |t|
    t.integer "employee_id", null: false
    t.integer "unit_id", null: false
    t.decimal "margin"
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_employees_units_on_organization_id"
  end

  create_table "events", id: :serial, force: :cascade do |t|
    t.string "name"
    t.datetime "start_date"
    t.datetime "end_date"
    t.float "lat"
    t.float "lng"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_events_on_organization_id"
  end

  create_table "external_contracts", id: :serial, force: :cascade do |t|
    t.integer "brand_id"
    t.string "name", default: ""
    t.jsonb "contact_emails", default: []
    t.text "terms_and_conditions", default: ""
    t.boolean "e_sig_required", default: false
    t.boolean "photo_id_required", default: false
    t.boolean "address_required", default: false
    t.boolean "age_required", default: false
    t.integer "required_age", default: 18
    t.string "photo_id_description", default: ""
    t.integer "status", default: 0
    t.text "contract_body", default: ""
    t.integer "organization_id"
    t.index ["brand_id"], name: "index_external_contracts_on_brand_id"
    t.index ["organization_id"], name: "index_external_contracts_on_organization_id"
  end

  create_table "failed_airbnb_updates", id: :serial, force: :cascade do |t|
    t.integer "unit_id"
    t.integer "update_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.jsonb "response", default: {}
    t.index ["organization_id"], name: "index_failed_airbnb_updates_on_organization_id"
    t.index ["unit_id"], name: "index_failed_airbnb_updates_on_unit_id"
  end

  create_table "fee_account_los_ranges", id: :serial, force: :cascade do |t|
    t.integer "fee_account_id"
    t.integer "min_nights"
    t.integer "max_nights"
    t.decimal "calculation_amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["fee_account_id"], name: "index_fee_account_los_ranges_on_fee_account_id"
    t.index ["organization_id"], name: "index_fee_account_los_ranges_on_organization_id"
  end

  create_table "fee_accounts", id: :serial, force: :cascade do |t|
    t.integer "organization_id"
    t.string "name"
    t.text "description"
    t.boolean "refundable", default: true
    t.boolean "taxable", default: true
    t.boolean "optional", default: false
    t.boolean "variable", default: false
    t.boolean "included_in_base_rent", default: false
    t.integer "calculation_type", default: 0
    t.decimal "calculation_amount", default: "0.0"
    t.integer "frequency", default: 0
    t.string "normalized_fee_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "internal_use_only", default: false
    t.integer "realization_type", default: 0
    t.boolean "quantity_fee", default: false
    t.integer "fee_quantity_max"
    t.string "split", default: "no"
    t.boolean "cancellation", default: false
    t.index ["organization_id"], name: "index_fee_accounts_on_organization_id"
  end

  create_table "fee_images", id: :serial, force: :cascade do |t|
    t.string "tenant_id"
    t.string "image"
    t.boolean "image_processing", default: false, null: false
    t.string "fee_imageable_type"
    t.integer "fee_imageable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fee_imageable_type", "fee_imageable_id"], name: "index_fee_images_on_fee_imageable_type_and_fee_imageable_id"
  end

  create_table "fees", id: :serial, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "unit_listing_id"
    t.integer "calculation_type"
    t.decimal "calculation_amount"
    t.boolean "refundable"
    t.boolean "taxable"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "is_addon"
    t.string "normalized_fee_name"
    t.integer "organization_id"
    t.integer "unit_pricing_id"
    t.integer "fee_account_id"
    t.integer "frequency", default: 0
    t.boolean "included_in_base_rent"
    t.boolean "internal_use_only", default: false
    t.integer "realization_type", default: 0
    t.string "split", default: "no"
    t.boolean "cancellation", default: false
    t.index ["fee_account_id"], name: "index_fees_on_fee_account_id"
    t.index ["organization_id"], name: "index_fees_on_organization_id"
    t.index ["unit_listing_id"], name: "index_fees_on_unit_listing_id"
    t.index ["unit_pricing_id"], name: "index_fees_on_unit_pricing_id"
  end

  create_table "generic_images", id: :serial, force: :cascade do |t|
    t.string "image"
    t.boolean "image_processing", default: false, null: false
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_generic_images_on_organization_id"
  end

  create_table "group_ranges", id: :serial, force: :cascade do |t|
    t.integer "unit_id"
    t.integer "rate_group_range_id"
    t.integer "unit_availability_id"
    t.integer "unit_pricing_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "rate_group_id"
    t.index ["rate_group_id"], name: "index_group_ranges_on_rate_group_id"
    t.index ["rate_group_range_id"], name: "index_group_ranges_on_rate_group_range_id"
    t.index ["unit_availability_id"], name: "index_group_ranges_on_unit_availability_id"
    t.index ["unit_id"], name: "index_group_ranges_on_unit_id"
    t.index ["unit_pricing_id"], name: "index_group_ranges_on_unit_pricing_id"
  end

  create_table "guests", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "telephone"
    t.string "email"
    t.boolean "primary_contact", default: true
    t.integer "booking_id"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["booking_id"], name: "index_guests_on_booking_id"
    t.index ["organization_id"], name: "index_guests_on_organization_id"
  end

  create_table "hero_images", id: :serial, force: :cascade do |t|
    t.string "tenant_id"
    t.string "image"
    t.boolean "image_processing", default: false, null: false
    t.string "hero_imageable_type"
    t.integer "hero_imageable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["hero_imageable_type", "hero_imageable_id"], name: "index_hero_images_on_hero_imageable_type_and_hero_imageable_id"
    t.index ["organization_id"], name: "index_hero_images_on_organization_id"
  end

  create_table "homeaway_subscriptions", id: :serial, force: :cascade do |t|
    t.integer "unit_id"
    t.integer "subscription_type", default: 0
    t.datetime "start_date"
    t.datetime "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_homeaway_subscriptions_on_organization_id"
    t.index ["unit_id"], name: "index_homeaway_subscriptions_on_unit_id"
  end

  create_table "id_photos", id: :serial, force: :cascade do |t|
    t.string "identifiable_type"
    t.integer "identifiable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "id_side", default: 0
    t.boolean "verified", default: false
    t.integer "organization_id"
    t.index ["identifiable_type", "identifiable_id"], name: "index_id_photos_on_identifiable_type_and_identifiable_id"
    t.index ["organization_id"], name: "index_id_photos_on_organization_id"
  end

  create_table "invoices", id: :serial, force: :cascade do |t|
    t.integer "work_report_id"
    t.string "pdf"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_invoices_on_organization_id"
    t.index ["work_report_id"], name: "index_invoices_on_work_report_id"
  end

  create_table "ledger_summary_exports", id: :serial, force: :cascade do |t|
    t.jsonb "filters"
    t.integer "file_format"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_ledger_summary_exports_on_organization_id"
  end

  create_table "legacy_redirects", id: :serial, force: :cascade do |t|
    t.integer "brand_id"
    t.string "redirect_from"
    t.string "redirect_to"
    t.integer "creation_method", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["brand_id"], name: "index_legacy_redirects_on_brand_id"
    t.index ["organization_id"], name: "index_legacy_redirects_on_organization_id"
  end

  create_table "line_items", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "total_cents"
    t.float "rate"
    t.boolean "taxable", default: false
    t.string "item_type"
    t.string "itemizable_type"
    t.integer "itemizable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "refundable", default: false
    t.boolean "optional", default: false
    t.jsonb "additional_data", default: {}
    t.integer "organization_id"
    t.string "split", default: "no"
    t.boolean "cancellation", default: false
    t.index ["itemizable_type", "itemizable_id"], name: "index_line_items_on_itemizable_type_and_itemizable_id"
    t.index ["organization_id"], name: "index_line_items_on_organization_id"
  end

  create_table "locations", id: :serial, force: :cascade do |t|
    t.string "adr_street"
    t.string "adr_unit"
    t.string "adr_city"
    t.string "adr_state"
    t.string "adr_country"
    t.string "adr_postal_code"
    t.float "geo_latitude"
    t.float "geo_longitude"
    t.string "locationable_type"
    t.integer "locationable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.boolean "exact", default: false
    t.index ["locationable_type", "locationable_id"], name: "index_locations_on_locationable_type_and_locationable_id"
    t.index ["organization_id"], name: "index_locations_on_organization_id"
  end

  create_table "menu_items", id: :serial, force: :cascade do |t|
    t.integer "menu_id"
    t.string "title"
    t.integer "position"
    t.boolean "visible"
    t.string "slug"
    t.string "targetable_type"
    t.integer "targetable_id"
    t.integer "parent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["menu_id"], name: "index_menu_items_on_menu_id"
    t.index ["organization_id"], name: "index_menu_items_on_organization_id"
    t.index ["targetable_type", "targetable_id"], name: "index_menu_items_on_targetable_type_and_targetable_id"
  end

  create_table "menus", id: :serial, force: :cascade do |t|
    t.integer "brand_id"
    t.integer "menu_type"
    t.boolean "active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["brand_id"], name: "index_menus_on_brand_id"
    t.index ["organization_id"], name: "index_menus_on_organization_id"
  end

  create_table "messages", id: :serial, force: :cascade do |t|
    t.text "body"
    t.datetime "read_at"
    t.integer "conversation_id"
    t.string "sender_type"
    t.integer "sender_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "sender_name"
    t.text "original_message"
    t.jsonb "channel_data", default: {}
    t.integer "organization_id"
    t.index ["conversation_id"], name: "index_messages_on_conversation_id"
    t.index ["organization_id"], name: "index_messages_on_organization_id"
    t.index ["sender_type", "sender_id"], name: "index_messages_on_sender_type_and_sender_id"
  end

  create_table "notes", id: :serial, force: :cascade do |t|
    t.string "notable_type"
    t.integer "notable_id"
    t.boolean "visible", default: true
    t.text "message"
    t.jsonb "note_data", default: {}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "creator_type"
    t.integer "creator_id"
    t.integer "organization_id"
    t.index ["creator_type", "creator_id"], name: "index_notes_on_creator_type_and_creator_id"
    t.index ["notable_type", "notable_id"], name: "index_notes_on_notable_type_and_notable_id"
    t.index ["organization_id"], name: "index_notes_on_organization_id"
  end

  create_table "notifications", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "n_type"
    t.boolean "active"
    t.string "subject"
    t.text "body"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "trigger"
    t.integer "channel_type", default: 0
    t.boolean "editable", default: true
  end

  create_table "opportunities", id: :serial, force: :cascade do |t|
    t.integer "customer_id"
    t.integer "unit_id"
    t.integer "conversation_id"
    t.integer "quote_id"
    t.integer "booking_id"
    t.string "assignee_type"
    t.integer "assignee_id"
    t.integer "booking_type"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "not_converted_reason"
    t.text "reason_text"
    t.boolean "manually_created"
    t.integer "organization_id"
    t.index ["assignee_type", "assignee_id"], name: "index_opportunities_on_assignee_type_and_assignee_id"
    t.index ["booking_id"], name: "index_opportunities_on_booking_id"
    t.index ["conversation_id"], name: "index_opportunities_on_conversation_id"
    t.index ["customer_id"], name: "index_opportunities_on_customer_id"
    t.index ["organization_id"], name: "index_opportunities_on_organization_id"
    t.index ["quote_id"], name: "index_opportunities_on_quote_id"
    t.index ["unit_id"], name: "index_opportunities_on_unit_id"
  end

  create_table "organization_channels", id: :serial, force: :cascade do |t|
    t.integer "organization_id"
    t.integer "channel_id"
    t.float "rate_increase"
    t.boolean "enabled"
    t.integer "legal_entity_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id"], name: "index_organization_channels_on_channel_id"
    t.index ["organization_id"], name: "index_organization_channels_on_organization_id"
  end

  create_table "organization_employees", id: :serial, force: :cascade do |t|
    t.integer "organization_id"
    t.string "email"
    t.integer "employee_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_organization_employees_on_organization_id"
  end

  create_table "organization_fees", id: :serial, force: :cascade do |t|
    t.string "name"
    t.decimal "whitelabel_org_rate", default: "0.0"
    t.decimal "channel_org_rate", default: "0.0"
    t.decimal "direct_rate", default: "0.0"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_organization_fees_on_organization_id"
  end

  create_table "organizations", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "subdomain"
    t.text "tenant_domains"
    t.text "description"
    t.integer "company_type"
    t.integer "organization_type"
    t.float "direct_fee_rate", default: 0.5, null: false
    t.integer "currency"
    t.integer "language"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "confirmed", default: false
    t.boolean "pmc_messages_only", default: true
    t.boolean "verification_message_enabled", default: false
    t.boolean "verification_reminder_message_enabled", default: false
    t.boolean "inquiry_received_enabled", default: false
    t.boolean "after_booking_confirmed_enabled", default: false
    t.boolean "check_in_instructions_verified_enabled", default: false
    t.boolean "check_in_instructions_enabled", default: false
    t.boolean "welcome_to_stay_enabled", default: false
    t.boolean "how_was_stay_enabled", default: false
    t.integer "parent_id"
    t.string "pointcentral_seamless_token"
    t.string "pointcentral_session_token"
    t.integer "global_date_format", default: 1
    t.boolean "should_split_bookings", default: false
    t.boolean "add_on_images", default: false
    t.string "status"
    t.index ["parent_id"], name: "index_organizations_on_parent_id"
    t.index ["subdomain"], name: "index_organizations_on_subdomain", unique: true
    t.index ["user_id"], name: "index_organizations_on_user_id"
  end

  create_table "owner_deductions", id: :serial, force: :cascade do |t|
    t.integer "amount_cents"
    t.string "note"
    t.string "reason"
    t.integer "deduction_type"
    t.string "deductable_type"
    t.integer "deductable_id"
    t.integer "employee_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["deductable_type", "deductable_id"], name: "index_owner_deductions_on_deductable_type_and_deductable_id"
    t.index ["employee_id"], name: "index_owner_deductions_on_employee_id"
    t.index ["organization_id"], name: "index_owner_deductions_on_organization_id"
  end

  create_table "partner_access_organizations", id: :serial, force: :cascade do |t|
    t.integer "partner_access_id"
    t.integer "organization_id"
    t.boolean "enabled"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_partner_access_organizations_on_organization_id"
    t.index ["partner_access_id"], name: "index_partner_access_organizations_on_partner_access_id"
  end

  create_table "partner_accesses", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "access_key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "payouts", id: :serial, force: :cascade do |t|
    t.integer "base_amount_cents", default: 0
    t.integer "total_adjustments_cents", default: 0
    t.integer "total_cents", default: 0
    t.integer "status", default: 0
    t.datetime "paid_at"
    t.integer "employee_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "stripe_transfer_id"
    t.string "pdf_summary"
    t.boolean "pdf_summary_processing", default: false
    t.string "type"
    t.date "due_date"
    t.string "source_type"
    t.integer "source_id"
    t.integer "total_deductions_cents", default: 0
    t.integer "unit_id"
    t.integer "organization_id"
    t.integer "total_fees_cents", default: 0
    t.integer "statement_id"
    t.integer "num_nights"
    t.boolean "cancellation", default: false
    t.index ["employee_id"], name: "index_payouts_on_employee_id"
    t.index ["organization_id"], name: "index_payouts_on_organization_id"
    t.index ["source_type", "source_id"], name: "index_payouts_on_source_type_and_source_id"
    t.index ["statement_id"], name: "index_payouts_on_statement_id"
    t.index ["unit_id"], name: "index_payouts_on_unit_id"
  end

  create_table "permissions", id: :serial, force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_permissions_on_organization_id"
  end

  create_table "point_central_mappings", id: :serial, force: :cascade do |t|
    t.string "mappable_type"
    t.integer "mappable_id"
    t.jsonb "data", default: {}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "status", default: 0
    t.integer "organization_id"
    t.index ["mappable_type", "mappable_id"], name: "index_point_central_mappings_on_mappable_type_and_mappable_id"
    t.index ["organization_id"], name: "index_point_central_mappings_on_organization_id"
  end

  create_table "portfolios", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "stripe_connect_account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_portfolios_on_organization_id"
    t.index ["stripe_connect_account_id"], name: "index_portfolios_on_stripe_connect_account_id"
  end

  create_table "promotions", id: :serial, force: :cascade do |t|
    t.string "special_type"
    t.integer "amount"
    t.integer "req_nights"
    t.date "travel_date_start"
    t.date "travel_end_date"
    t.date "promo_start_date"
    t.date "promo_end_date"
    t.string "days_of_week"
    t.boolean "code_req"
    t.string "coupon_code"
    t.string "name"
    t.string "internal_name"
    t.text "distro_list"
    t.integer "portfolio_id"
    t.integer "subportfolio_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "active", default: true
    t.index ["portfolio_id"], name: "index_promotions_on_portfolio_id"
    t.index ["subportfolio_id"], name: "index_promotions_on_subportfolio_id"
  end

  create_table "properties", id: :serial, force: :cascade do |t|
    t.string "name"
    t.boolean "active"
    t.boolean "multi_unit", default: false, null: false
    t.text "summary_accommodations"
    t.text "summary_description"
    t.text "summary_headline"
    t.text "summary_rules"
    t.text "features_adventure"
    t.text "features_attractions"
    t.text "features_car"
    t.text "features_leisure"
    t.text "features_local"
    t.text "features_location"
    t.integer "property_type"
    t.integer "organization_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "manager_info_visible", default: true
    t.string "registration_id"
    t.string "external_id"
    t.jsonb "extra", default: {}
    t.string "unit_code"
    t.index ["organization_id"], name: "index_properties_on_organization_id"
  end

  create_table "property_channels", id: :serial, force: :cascade do |t|
    t.integer "property_id"
    t.integer "channel_id"
    t.string "channel_code"
    t.string "channel_url"
    t.datetime "last_sync_at"
    t.integer "status"
    t.boolean "enabled", default: false
    t.jsonb "sync_errors", default: "{}", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["channel_id"], name: "index_property_channels_on_channel_id"
    t.index ["organization_id"], name: "index_property_channels_on_organization_id"
    t.index ["property_id"], name: "index_property_channels_on_property_id"
    t.index ["sync_errors"], name: "index_property_channels_on_sync_errors", using: :gin
  end

  create_table "property_images", id: :serial, force: :cascade do |t|
    t.string "image"
    t.boolean "image_processing", default: false, null: false
    t.string "label", default: ""
    t.integer "order"
    t.integer "property_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "height"
    t.integer "width"
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_property_images_on_organization_id"
    t.index ["property_id"], name: "index_property_images_on_property_id"
  end

  create_table "quote_overrides", id: :serial, force: :cascade do |t|
    t.integer "quote_id"
    t.jsonb "quote_change", default: {}
    t.string "line_item_code", default: ""
    t.jsonb "previous_value", default: {}
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_quote_overrides_on_organization_id"
    t.index ["quote_id"], name: "index_quote_overrides_on_quote_id"
  end

  create_table "quotes", id: :serial, force: :cascade do |t|
    t.integer "unit_id"
    t.date "check_in"
    t.date "check_out"
    t.integer "room_rate_cents"
    t.integer "fees_cents"
    t.integer "taxes_cents"
    t.integer "extras_cents"
    t.integer "total_cents"
    t.datetime "expires_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "subtotal_cents"
    t.integer "direct_net_cents"
    t.float "direct_fee_rate"
    t.integer "billable_nights", default: 0
    t.float "tax_rate", default: 0.0
    t.integer "inflation_cents", default: 0
    t.float "inflation_rate", default: 0.0
    t.integer "discount_cents", default: 0
    t.integer "deposit_cents", default: 0
    t.jsonb "daily_rates", default: []
    t.string "booking_code"
    t.string "currency", default: "usd"
    t.integer "channel_id"
    t.integer "num_guests"
    t.integer "organization_id"
    t.index ["channel_id"], name: "index_quotes_on_channel_id"
    t.index ["organization_id"], name: "index_quotes_on_organization_id"
    t.index ["unit_id"], name: "index_quotes_on_unit_id"
  end

  create_table "rate_group_ranges", id: :serial, force: :cascade do |t|
    t.string "name"
    t.boolean "variable"
    t.string "range_type"
    t.string "availability"
    t.decimal "default_nightly_weekday"
    t.decimal "default_nightly_weekend"
    t.decimal "discount_full_week"
    t.decimal "discount_full_month"
    t.integer "default_stay_max"
    t.integer "default_stay_min"
    t.string "default_time_check_in"
    t.string "default_time_check_out"
    t.integer "default_prior_notify_min"
    t.text "availability_calendar"
    t.text "booking_calendar"
    t.text "pricing_calendar"
    t.string "default_availability_changeover"
    t.string "start_date"
    t.string "end_date"
    t.integer "rate_group_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "changeover_type"
    t.boolean "pricing_variable"
    t.index ["rate_group_id"], name: "index_rate_group_ranges_on_rate_group_id"
  end

  create_table "rate_groups", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "subportfolio_id"
    t.integer "portfolio_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["portfolio_id"], name: "index_rate_groups_on_portfolio_id"
    t.index ["subportfolio_id"], name: "index_rate_groups_on_subportfolio_id"
  end

  create_table "refunds", id: :serial, force: :cascade do |t|
    t.decimal "amount_refunded"
    t.integer "reason"
    t.text "extra_notes"
    t.integer "charge_id"
    t.integer "booking_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["booking_id"], name: "index_refunds_on_booking_id"
    t.index ["charge_id"], name: "index_refunds_on_charge_id"
  end

  create_table "rental_agreements", id: :serial, force: :cascade do |t|
    t.string "pdf"
    t.boolean "pdf_processing", default: false, null: false
    t.integer "brand_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.string "short_url"
    t.index ["brand_id"], name: "index_rental_agreements_on_brand_id"
    t.index ["organization_id"], name: "index_rental_agreements_on_organization_id"
  end

  create_table "reports", id: :serial, force: :cascade do |t|
    t.integer "format_type"
    t.string "export"
    t.integer "reporter_id"
    t.string "reporter_type"
    t.datetime "range_start"
    t.datetime "range_end"
    t.integer "report_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
  end

  create_table "res_contracts", id: :serial, force: :cascade do |t|
    t.integer "booking_id"
    t.integer "external_contract_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "terms_accepted", default: true
    t.integer "organization_id"
    t.index ["booking_id"], name: "index_res_contracts_on_booking_id"
    t.index ["external_contract_id"], name: "index_res_contracts_on_external_contract_id"
    t.index ["organization_id"], name: "index_res_contracts_on_organization_id"
  end

  create_table "reviews", id: :serial, force: :cascade do |t|
    t.integer "unit_id"
    t.integer "booking_id"
    t.integer "channel_id"
    t.string "title"
    t.text "body"
    t.string "name"
    t.datetime "check_in_date"
    t.integer "status"
    t.integer "rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "reviewed_date"
    t.datetime "check_out_date"
    t.text "where_from"
    t.integer "organization_id"
    t.index ["booking_id"], name: "index_reviews_on_booking_id"
    t.index ["organization_id"], name: "index_reviews_on_organization_id"
    t.index ["unit_id"], name: "index_reviews_on_unit_id"
  end

  create_table "signatures", id: :serial, force: :cascade do |t|
    t.string "signee_type"
    t.integer "signee_id"
    t.string "data_uri"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.inet "ip_address"
    t.index ["organization_id"], name: "index_signatures_on_organization_id"
    t.index ["signee_type", "signee_id"], name: "index_signatures_on_signee_type_and_signee_id"
  end

  create_table "standard_contracts", id: :serial, force: :cascade do |t|
    t.integer "booking_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "created_without_id"
    t.inet "ip_address"
    t.index ["booking_id"], name: "index_standard_contracts_on_booking_id"
  end

  create_table "statement_actions", id: :serial, force: :cascade do |t|
    t.integer "payout_action"
    t.jsonb "payout_action_errors"
    t.integer "statement_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "statement_balance_cents"
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_statement_actions_on_organization_id"
    t.index ["statement_id"], name: "index_statement_actions_on_statement_id"
  end

  create_table "statement_details_descriptions", id: :serial, force: :cascade do |t|
    t.integer "organization_id"
    t.string "po_description", default: ""
    t.string "contractor_description", default: ""
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_statement_details_descriptions_on_organization_id"
  end

  create_table "statements", id: :serial, force: :cascade do |t|
    t.integer "document_id"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "end_balance_cents", default: 0
    t.integer "start_balance_cents", default: 0
    t.date "start_date"
    t.date "end_date"
    t.datetime "processed_at"
    t.string "payee_type"
    t.integer "payee_id"
    t.string "optional_id"
    t.string "optional_note"
    t.integer "current_balance_cents", default: 0
    t.integer "visibility_status", default: 0
    t.integer "organization_id"
    t.integer "payee_role", default: 3
    t.index ["document_id"], name: "index_statements_on_document_id"
    t.index ["organization_id"], name: "index_statements_on_organization_id"
    t.index ["payee_type", "payee_id"], name: "index_statements_on_payee_type_and_payee_id"
  end

  create_table "stripe_bank_accounts", id: :serial, force: :cascade do |t|
    t.integer "account_type"
    t.string "acct_id"
    t.string "display_name"
    t.string "holder_type"
    t.integer "holder_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "bank_id"
    t.integer "stripe_connect_account_id"
    t.integer "organization_id"
    t.index ["holder_type", "holder_id"], name: "index_stripe_bank_accounts_on_holder_type_and_holder_id"
    t.index ["organization_id"], name: "index_stripe_bank_accounts_on_organization_id"
    t.index ["stripe_connect_account_id"], name: "index_stripe_bank_accounts_on_stripe_connect_account_id"
  end

  create_table "stripe_connect_accounts", id: :serial, force: :cascade do |t|
    t.string "access_token"
    t.string "token_type"
    t.string "stripe_publishable_key"
    t.string "scope"
    t.boolean "livemode"
    t.string "stripe_user_id"
    t.string "refresh_token"
    t.integer "organization_id"
    t.string "api_key"
    t.string "display_name", default: ""
    t.boolean "special_pricing_enabled", default: false
    t.date "start_date"
    t.index ["organization_id"], name: "index_stripe_connect_accounts_on_organization_id"
  end

  create_table "stripe_reports", id: :serial, force: :cascade do |t|
    t.integer "organization_id"
    t.integer "stripe_connect_account_id"
    t.string "stripe_report_id"
    t.string "stripe_file_id"
    t.datetime "interval_start"
    t.datetime "interval_end"
    t.jsonb "data", default: {}
    t.integer "status", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_stripe_reports_on_organization_id"
    t.index ["stripe_connect_account_id"], name: "index_stripe_reports_on_stripe_connect_account_id"
  end

  create_table "subportfolios", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "portfolio_id"
    t.index ["portfolio_id"], name: "index_subportfolios_on_portfolio_id"
  end

  create_table "subscriptions", id: :serial, force: :cascade do |t|
    t.integer "organization_id"
    t.integer "tier"
    t.integer "interval"
    t.float "custom_direct_fee_rate"
    t.string "stripe_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "custom_parent_fee_rate"
    t.index ["organization_id"], name: "index_subscriptions_on_organization_id"
  end

  create_table "tax_accounts", id: :serial, force: :cascade do |t|
    t.integer "organization_id"
    t.float "rate"
    t.integer "tax_type"
    t.string "name"
    t.datetime "start_date"
    t.datetime "end_date"
    t.float "adj_tax"
    t.integer "max_night_with_tax_rate"
    t.boolean "exclude_tax", default: false
    t.boolean "tax_adjustable", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "applies_to_room_rate", default: true
    t.index ["organization_id"], name: "index_tax_accounts_on_organization_id"
  end

  create_table "taxable_fees", id: :serial, force: :cascade do |t|
    t.integer "fee_account_id"
    t.integer "tax_account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fee_account_id"], name: "index_taxable_fees_on_fee_account_id"
    t.index ["tax_account_id"], name: "index_taxable_fees_on_tax_account_id"
  end

  create_table "taxes", id: :serial, force: :cascade do |t|
    t.float "rate"
    t.integer "tax_type"
    t.string "name"
    t.datetime "start_date"
    t.datetime "end_date"
    t.integer "unit_listing_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "adj_tax"
    t.integer "max_night_with_tax_rate"
    t.boolean "exclude_tax"
    t.boolean "tax_adjustable"
    t.integer "organization_id"
    t.integer "unit_pricing_id"
    t.integer "tax_account_id"
    t.index ["organization_id"], name: "index_taxes_on_organization_id"
    t.index ["tax_account_id"], name: "index_taxes_on_tax_account_id"
    t.index ["unit_listing_id"], name: "index_taxes_on_unit_listing_id"
    t.index ["unit_pricing_id"], name: "index_taxes_on_unit_pricing_id"
  end

  create_table "team_members", id: :serial, force: :cascade do |t|
    t.integer "team_id"
    t.string "member_type"
    t.integer "member_id"
    t.integer "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["member_type", "member_id"], name: "index_team_members_on_member_type_and_member_id"
    t.index ["organization_id"], name: "index_team_members_on_organization_id"
    t.index ["team_id"], name: "index_team_members_on_team_id"
  end

  create_table "team_portfolios", id: :serial, force: :cascade do |t|
    t.integer "team_id"
    t.integer "portfolio_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_team_portfolios_on_organization_id"
    t.index ["portfolio_id"], name: "index_team_portfolios_on_portfolio_id"
    t.index ["team_id"], name: "index_team_portfolios_on_team_id"
  end

  create_table "teams", id: :serial, force: :cascade do |t|
    t.string "name"
    t.string "ein"
    t.string "phone"
    t.integer "category"
    t.integer "location_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "payout_frequency", default: 0
    t.integer "organization_id"
    t.index ["location_id"], name: "index_teams_on_location_id"
    t.index ["organization_id"], name: "index_teams_on_organization_id"
  end

  create_table "temp_apartment_tables", id: :serial, force: :cascade do |t|
    t.integer "organization_id"
    t.string "direct_class"
    t.jsonb "data", default: {}
    t.integer "status"
    t.integer "new_id"
    t.integer "old_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["organization_id"], name: "index_temp_apartment_tables_on_organization_id"
  end

  create_table "temp_bookings", id: :serial, force: :cascade do |t|
    t.string "data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_temp_bookings_on_organization_id"
  end

  create_table "unit_availabilities", id: :serial, force: :cascade do |t|
    t.string "default_availability_changeover"
    t.integer "default_stay_max"
    t.integer "default_stay_min"
    t.string "default_time_check_in"
    t.string "default_time_check_out"
    t.integer "default_prior_notify_min"
    t.text "availability_calendar"
    t.text "booking_calendar"
    t.text "check_in_check_out_policy"
    t.integer "unit_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_unit_availabilities_on_organization_id"
    t.index ["unit_id"], name: "index_unit_availabilities_on_unit_id"
  end

  create_table "unit_channels", id: :serial, force: :cascade do |t|
    t.integer "unit_id"
    t.integer "channel_id"
    t.string "channel_code"
    t.datetime "last_sync_at"
    t.integer "status"
    t.boolean "enabled"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_unit_channels_on_organization_id"
    t.index ["unit_id"], name: "index_unit_channels_on_unit_id"
  end

  create_table "unit_group_promos", id: :serial, force: :cascade do |t|
    t.integer "amount"
    t.integer "req_nights"
    t.integer "unit_group_id"
    t.integer "promotion_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["promotion_id"], name: "index_unit_group_promos_on_promotion_id"
    t.index ["unit_group_id"], name: "index_unit_group_promos_on_unit_group_id"
  end

  create_table "unit_group_ranges", id: :serial, force: :cascade do |t|
    t.integer "rate_group_range_id"
    t.integer "unit_group_id"
    t.decimal "default_nightly_weekday"
    t.decimal "default_nightly_weekend"
    t.decimal "discount_full_week"
    t.decimal "discount_full_month"
    t.index ["rate_group_range_id"], name: "index_unit_group_ranges_on_rate_group_range_id"
    t.index ["unit_group_id"], name: "index_unit_group_ranges_on_unit_group_id"
  end

  create_table "unit_groups", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "subportfolio_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "rate_group_id"
    t.integer "portfolio_id"
    t.string "start_date"
    t.string "end_date"
    t.decimal "default_nightly_weekday"
    t.decimal "default_nightly_weekend"
    t.decimal "discount_full_week"
    t.decimal "discount_full_month"
    t.index ["portfolio_id"], name: "index_unit_groups_on_portfolio_id"
    t.index ["rate_group_id"], name: "index_unit_groups_on_rate_group_id"
    t.index ["subportfolio_id"], name: "index_unit_groups_on_subportfolio_id"
  end

  create_table "unit_images", id: :serial, force: :cascade do |t|
    t.string "image"
    t.boolean "image_processing", default: false, null: false
    t.string "label", default: ""
    t.integer "order"
    t.integer "unit_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "height"
    t.integer "width"
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_unit_images_on_organization_id"
    t.index ["unit_id"], name: "index_unit_images_on_unit_id"
  end

  create_table "unit_listings", id: :serial, force: :cascade do |t|
    t.string "currency", default: "usd"
    t.integer "unit_id"
    t.float "tax_rate"
    t.integer "brand_id"
    t.boolean "instant_booking"
    t.integer "refund_policy"
    t.text "refund_policy_custom"
    t.boolean "featured"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "enabled_distribution_homeaway", default: false, null: false
    t.boolean "enabled_distribution_booking", default: false, null: false
    t.boolean "enabled_distribution_airbnb", default: false, null: false
    t.integer "airbnb_refund_policy"
    t.integer "booking_dot_com_refund_policy"
    t.integer "homeaway_refund_policy"
    t.float "adj_tax", default: 0.0
    t.integer "max_night_with_tax_rate", default: 0
    t.boolean "exclude_tax", default: false
    t.boolean "tax_adjustable", default: false
    t.integer "organization_id"
    t.index ["brand_id"], name: "index_unit_listings_on_brand_id"
    t.index ["organization_id"], name: "index_unit_listings_on_organization_id"
    t.index ["unit_id"], name: "index_unit_listings_on_unit_id"
  end

  create_table "unit_pricings", id: :serial, force: :cascade do |t|
    t.decimal "default_nightly_weekday"
    t.decimal "default_nightly_weekend"
    t.decimal "discount_full_week"
    t.decimal "discount_full_month"
    t.text "pricing_calendar"
    t.integer "unit_listing_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.integer "unit_id"
    t.integer "additional_guest_amount_cents"
    t.integer "additional_guest_start", default: 1
    t.index ["organization_id"], name: "index_unit_pricings_on_organization_id"
    t.index ["unit_id"], name: "index_unit_pricings_on_unit_id"
    t.index ["unit_listing_id"], name: "index_unit_pricings_on_unit_listing_id"
  end

  create_table "unit_promos", id: :serial, force: :cascade do |t|
    t.integer "promotion_id"
    t.integer "unit_id"
    t.integer "amount"
    t.integer "req_nights"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["promotion_id"], name: "index_unit_promos_on_promotion_id"
    t.index ["unit_id"], name: "index_unit_promos_on_unit_id"
  end

  create_table "unit_ranges", id: :serial, force: :cascade do |t|
    t.string "start_date"
    t.string "end_date"
    t.decimal "default_nightly_weekday"
    t.decimal "default_nightly_weekend"
    t.decimal "discount_full_week"
    t.decimal "discount_full_month"
    t.text "pricing_calendar"
    t.integer "unit_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "rate_group_range_id"
    t.integer "rate_group_id"
    t.index ["rate_group_id"], name: "index_unit_ranges_on_rate_group_id"
    t.index ["rate_group_range_id"], name: "index_unit_ranges_on_rate_group_range_id"
    t.index ["unit_id"], name: "index_unit_ranges_on_unit_id"
  end

  create_table "units", id: :serial, force: :cascade do |t|
    t.string "name"
    t.boolean "active"
    t.text "summary_description"
    t.text "features_accommodations"
    t.text "features_amenities"
    t.text "features_dining"
    t.text "features_entertainment"
    t.text "features_outdoor"
    t.text "features_spa"
    t.text "features_suitability"
    t.text "features_themes"
    t.float "num_bathrooms"
    t.integer "num_bedrooms"
    t.integer "num_lounge"
    t.integer "num_sleep"
    t.integer "num_sleep_in_beds"
    t.integer "unit_type"
    t.integer "property_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "check_in_instructions", default: {}
    t.string "emergency_contact_phone"
    t.string "emergency_contact_first_name"
    t.string "emergency_contact_last_name"
    t.integer "portfolio_id"
    t.string "external_id"
    t.integer "external_contract_id"
    t.string "airbnb_headline"
    t.string "pointcentral_customer_id"
    t.integer "organization_id"
    t.jsonb "extra", default: {}
    t.integer "subportfolio_id"
    t.integer "unit_group_id"
    t.integer "rate_group_id"
    t.integer "size"
    t.integer "measurement_type", default: 0
    t.integer "minimum_age"
    t.text "features_safety"
    t.string "guest_controls_description"
    t.string "unit_code"
    t.index ["external_contract_id"], name: "index_units_on_external_contract_id"
    t.index ["organization_id"], name: "index_units_on_organization_id"
    t.index ["portfolio_id"], name: "index_units_on_portfolio_id"
    t.index ["property_id"], name: "index_units_on_property_id"
    t.index ["rate_group_id"], name: "index_units_on_rate_group_id"
    t.index ["subportfolio_id"], name: "index_units_on_subportfolio_id"
    t.index ["unit_group_id"], name: "index_units_on_unit_group_id"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "name", default: "", null: false
    t.string "avatar", default: ""
    t.boolean "avatar_processing", default: false, null: false
    t.string "telephone", default: ""
    t.boolean "admin", default: false, null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "stripe_customer_id"
    t.string "auth_token"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "versions", id: :serial, force: :cascade do |t|
    t.string "item_type", null: false
    t.integer "item_id", null: false
    t.string "event", null: false
    t.string "whodunnit"
    t.text "old_object"
    t.datetime "created_at"
    t.string "whodunnit_type"
    t.text "old_object_changes"
    t.jsonb "object"
    t.jsonb "object_changes"
    t.index ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id"
  end

  create_table "work_orders", id: :serial, force: :cascade do |t|
    t.integer "wo_type"
    t.integer "wo_source"
    t.datetime "due_on"
    t.datetime "completed_on"
    t.datetime "paid_on"
    t.text "description"
    t.integer "amount_cents"
    t.string "assignee_type"
    t.integer "assignee_id"
    t.integer "unit_id"
    t.integer "property_id"
    t.integer "booking_id"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["assignee_type", "assignee_id"], name: "index_work_orders_on_assignee_type_and_assignee_id"
    t.index ["booking_id"], name: "index_work_orders_on_booking_id"
    t.index ["organization_id"], name: "index_work_orders_on_organization_id"
    t.index ["property_id"], name: "index_work_orders_on_property_id"
    t.index ["unit_id"], name: "index_work_orders_on_unit_id"
  end

  create_table "work_report_attachments", id: :serial, force: :cascade do |t|
    t.string "attachment"
    t.integer "work_report_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_work_report_attachments_on_organization_id"
    t.index ["work_report_id"], name: "index_work_report_attachments_on_work_report_id"
  end

  create_table "work_reports", id: :serial, force: :cascade do |t|
    t.integer "work_order_id"
    t.integer "status"
    t.jsonb "notes", default: []
    t.integer "base_amount_cents"
    t.integer "total_adjustments_cents"
    t.integer "total_cents"
    t.text "description"
    t.integer "payment_terms"
    t.string "reporter_type"
    t.integer "reporter_id"
    t.string "reviewer_type"
    t.integer "reviewer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "total_deductions_cents"
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_work_reports_on_organization_id"
    t.index ["reporter_type", "reporter_id"], name: "index_work_reports_on_reporter_type_and_reporter_id"
    t.index ["reviewer_type", "reviewer_id"], name: "index_work_reports_on_reviewer_type_and_reviewer_id"
    t.index ["work_order_id"], name: "index_work_reports_on_work_order_id"
  end

  create_table "workflow_units", id: :serial, force: :cascade do |t|
    t.integer "workflow_id"
    t.integer "unit_id"
    t.boolean "enabled"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_workflow_units_on_organization_id"
    t.index ["unit_id"], name: "index_workflow_units_on_unit_id"
    t.index ["workflow_id"], name: "index_workflow_units_on_workflow_id"
  end

  create_table "workflows", id: :serial, force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.boolean "enabled"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "organization_id"
    t.index ["organization_id"], name: "index_workflows_on_organization_id"
  end

  add_foreign_key "access_role_permissions", "access_roles"
  add_foreign_key "access_role_permissions", "permissions"
  add_foreign_key "booking_com_temps", "properties"
  add_foreign_key "booking_com_temps", "units"
  add_foreign_key "booking_net_details", "quotes"
  add_foreign_key "booking_net_overrides", "booking_net_details"
  add_foreign_key "booking_rate_plans", "properties"
  add_foreign_key "bookings", "quotes"
  add_foreign_key "bookings", "unit_listings"
  add_foreign_key "brand_footers", "brands"
  add_foreign_key "brand_headers", "brands"
  add_foreign_key "brand_home_pages", "brands"
  add_foreign_key "brand_infos", "brands"
  add_foreign_key "brand_pages", "brands"
  add_foreign_key "charges", "bookings"
  add_foreign_key "charges", "coupons"
  add_foreign_key "deductions", "deduction_accounts"
  add_foreign_key "deductions", "unit_pricings"
  add_foreign_key "deposits", "unit_pricings"
  add_foreign_key "domains", "brands"
  add_foreign_key "email_receipts", "bookings"
  add_foreign_key "email_receipts", "notifications"
  add_foreign_key "employee_access_roles", "access_roles"
  add_foreign_key "employee_access_roles", "employees"
  add_foreign_key "employee_permissions", "employees"
  add_foreign_key "employee_permissions", "permissions"
  add_foreign_key "employee_portfolios", "employees"
  add_foreign_key "employee_units", "employees"
  add_foreign_key "employee_units", "units"
  add_foreign_key "external_contracts", "brands"
  add_foreign_key "failed_airbnb_updates", "units"
  add_foreign_key "fees", "fee_accounts"
  add_foreign_key "fees", "unit_pricings"
  add_foreign_key "group_ranges", "rate_group_ranges"
  add_foreign_key "group_ranges", "rate_groups"
  add_foreign_key "group_ranges", "unit_availabilities"
  add_foreign_key "group_ranges", "unit_pricings"
  add_foreign_key "group_ranges", "units"
  add_foreign_key "homeaway_subscriptions", "units"
  add_foreign_key "invoices", "work_reports"
  add_foreign_key "menu_items", "menus"
  add_foreign_key "menus", "brands"
  add_foreign_key "opportunities", "bookings"
  add_foreign_key "opportunities", "conversations"
  add_foreign_key "opportunities", "customers"
  add_foreign_key "opportunities", "quotes"
  add_foreign_key "opportunities", "units"
  add_foreign_key "organization_employees", "organizations"
  add_foreign_key "organization_fees", "organizations"
  add_foreign_key "organizations", "organizations", column: "parent_id"
  add_foreign_key "organizations", "users"
  add_foreign_key "owner_deductions", "employees"
  add_foreign_key "partner_access_organizations", "organizations"
  add_foreign_key "partner_access_organizations", "partner_accesses"
  add_foreign_key "payouts", "statements"
  add_foreign_key "payouts", "units"
  add_foreign_key "property_channels", "properties"
  add_foreign_key "quote_overrides", "quotes"
  add_foreign_key "quotes", "units"
  add_foreign_key "rate_group_ranges", "rate_groups"
  add_foreign_key "refunds", "bookings"
  add_foreign_key "refunds", "charges"
  add_foreign_key "rental_agreements", "brands"
  add_foreign_key "res_contracts", "bookings"
  add_foreign_key "res_contracts", "external_contracts"
  add_foreign_key "reviews", "bookings"
  add_foreign_key "reviews", "units"
  add_foreign_key "standard_contracts", "bookings"
  add_foreign_key "statement_actions", "statements"
  add_foreign_key "statements", "documents"
  add_foreign_key "stripe_connect_accounts", "organizations"
  add_foreign_key "subportfolios", "portfolios"
  add_foreign_key "taxable_fees", "fee_accounts"
  add_foreign_key "taxable_fees", "tax_accounts"
  add_foreign_key "taxes", "tax_accounts"
  add_foreign_key "taxes", "unit_pricings"
  add_foreign_key "team_members", "teams"
  add_foreign_key "team_portfolios", "portfolios"
  add_foreign_key "team_portfolios", "teams"
  add_foreign_key "teams", "locations"
  add_foreign_key "temp_apartment_tables", "organizations"
  add_foreign_key "unit_channels", "units"
  add_foreign_key "unit_group_promos", "promotions"
  add_foreign_key "unit_group_promos", "unit_groups"
  add_foreign_key "unit_group_ranges", "rate_group_ranges"
  add_foreign_key "unit_group_ranges", "unit_groups"
  add_foreign_key "unit_pricings", "units"
  add_foreign_key "unit_promos", "promotions"
  add_foreign_key "unit_promos", "units"
  add_foreign_key "unit_ranges", "rate_group_ranges"
  add_foreign_key "unit_ranges", "rate_groups"
  add_foreign_key "unit_ranges", "units"
  add_foreign_key "units", "external_contracts"
  add_foreign_key "units", "portfolios"
  add_foreign_key "units", "subportfolios"
  add_foreign_key "work_orders", "bookings"
  add_foreign_key "work_orders", "properties"
  add_foreign_key "work_orders", "units"
  add_foreign_key "work_report_attachments", "work_reports"
  add_foreign_key "work_reports", "work_orders"
  add_foreign_key "workflow_units", "units"
  add_foreign_key "workflow_units", "workflows"
end
