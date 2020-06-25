class AddInfoColumnsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :name, :string
    add_column :users, :phonenumber, :string
    add_column :users, :hours, :string
  end
end
