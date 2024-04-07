import { Table, Column, Default, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: 'products'
})

class Product extends Model {
  @Column(DataType.STRING(100))
  name: string

  @Column(DataType.FLOAT)
  price: number

  @Default(true)
  @Column(DataType.BOOLEAN)
  availability: boolean
}

export default Product