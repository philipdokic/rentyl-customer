class CreateBrands < ActiveRecord::Migration[6.0]
  def change
    create_table :brands do |t|

      t.timestamps
    end
  end
end
