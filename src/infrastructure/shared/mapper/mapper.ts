export default interface Mapper<Entity, Model> {
  toEntity(model: Model): Entity;
  toModel(entity: Entity): any;
}
