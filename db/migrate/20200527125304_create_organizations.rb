class CreateOrganizations < ActiveRecord::Migration[6.0]
  def change
    unless table_exists?(:organizations)
      create_table :organizations do |t|

        t.timestamps
      end
    end
  end
end
