# Where the I18n library should search for translation files
I18n.load_path += Dir[Rails.root.join('lib', 'locale', '*.{rb,yml}')]

# Whitelist locales available for the application
I18n.available_locales = [
  :ar,
  :bn,
  :cs,
  :da,
  :nl,
  :en,
  :et,
  :fr,
  :de,
  :el,
  :hi,
  :hu,
  :id,
  :it,
  :ja,
  :jv,
  :ko,
  :nb,
  :pa,
  :pl,
  :pt,
  :ru,
  :es,
  :sv,
  :th,
  :tr,
  :vi,
  :zh
]
I18n.default_locale = :en
