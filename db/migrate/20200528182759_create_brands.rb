class CreateBrands < ActiveRecord::Migration[6.0]
  def change
    unless table_exists?(:brands)
      create_table :brands do |t|

        t.timestamps
      end
    end
  end
end
