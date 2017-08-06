const actions = {
  "entities": (entities, data) => data,
  "userJoin": (entities, data) => entities.concat(data.player),
  "userLeave": (entities, data) => entities.filter(entity => entity.id !== data.player.id),
  "worldUpdate": (entities, data) => entities
    .map(entity => data.entities.find( newEntity => newEntity.id === entity.id) || entity)
};

export default (entities = [], action) => actions[action.type]
  ? actions[action.type](entities, action.data)
  : entities;
