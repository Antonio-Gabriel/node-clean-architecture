import { Model } from 'sequelize-typescript';
import { Column } from 'sequelize-typescript/dist/model/column/column';
import { PrimaryKey } from 'sequelize-typescript/dist/model/column/primary-key/primary-key';
import { Table } from 'sequelize-typescript/dist/model/table/table';

@Table({
    tableName: "products",
    timestamps: false
})

export default class ProductModel extends Model{

    @PrimaryKey
    @Column
    declare id: string

    @Column({allowNull: false})
    declare name: string

    @Column({allowNull: false})
    declare price: number
}