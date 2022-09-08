var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        // If Creep is not full AND if Creep is not transfering then harvest source
	    if(creep.store.getFreeCapacity() > 0) {
            let sources = creep.room.find(FIND_SOURCES);
            let closestSource = creep.pos.findClosestByPath(sources, {
                filter: (sources) => {
                    return (sources.energy !== 0);
                }
            })
            console.log(closestSource)
            if(creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestSource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        // If Creep is full then find structures
        else if (!creep.store.getFreeCapacity() > 0) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } else {
            
        }
	}
};

module.exports = roleHarvester;