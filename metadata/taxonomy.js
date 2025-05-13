// Helper function to get the authorization token from sessionStorage
const getAuthToken = () => {
  return sessionStorage.getItem('token');
};

// 1. Create a new taxonomy
async function createTaxonomy(taxonomyData) {
  const token = getAuthToken();
  const response = await fetch('https://api.box.com/2.0/metadata_taxonomies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(taxonomyData),
  });
  return await response.json();
}

// 2. Retrieve all taxonomies in a specified namespace
async function getTaxonomiesByNamespace(namespace, marker = '', limit = 50) {
  const token = getAuthToken();
  const url = `https://api.box.com/2.0/metadata_taxonomies/${namespace}?marker=${marker}&limit=${limit}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await response.json();
}

// 3. Retrieve a specific taxonomy by its key
async function getTaxonomyByKey(namespace, taxonomyKey) {
  const token = getAuthToken();
  const url = `https://api.box.com/2.0/metadata_taxonomies/${namespace}/${taxonomyKey}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await response.json();
}

// 4. Update an existing taxonomy's display name
async function updateTaxonomy(namespace, taxonomyKey, updateData) {
  const token = getAuthToken();
  const url = `https://api.box.com/2.0/metadata_taxonomies/${namespace}/${taxonomyKey}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  });
  return await response.json();
}

// 5. Delete a specified taxonomy
async function deleteTaxonomy(namespace, taxonomyKey) {
  const token = getAuthToken();
  const url = `https://api.box.com/2.0/metadata_taxonomies/${namespace}/${taxonomyKey}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (response.status === 204) {
    return 'Taxonomy deleted successfully';
  }
  return await response.json();
}

// 6. Add a level to a taxonomy
async function addLevelToTaxonomy(namespace, taxonomyKey, levelData) {
  const token = getAuthToken();
  const url = `https://api.box.com/2.0/metadata_taxonomies/${namespace}/${taxonomyKey}/levels`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(levelData),
  });
  return await response.json();
}

// 7. Modify an existing level's display name and description
async function updateLevelInTaxonomy(namespace, taxonomyKey, levelId, levelData) {
  const token = getAuthToken();
  const url = `https://api.box.com/2.0/metadata_taxonomies/${namespace}/${taxonomyKey}/levels/${levelId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(levelData),
  });
  return await response.json();
}

// 8. Delete the last level from a taxonomy
async function deleteLevelFromTaxonomy(namespace, taxonomyKey, levelId) {
  const token = getAuthToken();
  const url = `https://api.box.com/2.0/metadata_taxonomies/${namespace}/${taxonomyKey}/levels/${levelId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (response.status === 204) {
    return 'Level deleted successfully';
  }
  return await response.json();
}

// 9. Add a node to a taxonomy
async function addNodeToTaxonomy(namespace, taxonomyKey, nodeData) {
  const token = getAuthToken();
  const url = `https://api.box.com/2.0/metadata_taxonomies/${namespace}/${taxonomyKey}/nodes`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(nodeData),
  });
  return await response.json();
}

// 10. Retrieve a single node by its ID
async function getNodeById(namespace, taxonomyKey, nodeId, includeAncestors = false) {
  const token = getAuthToken();
  const url = `https://api.box.com/2.0/metadata_taxonomies/${namespace}/${taxonomyKey}/nodes/${nodeId}?include-ancestors=${includeAncestors}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await response.json();
}

// 11. Retrieve multiple nodes
async function getNodes(namespace, taxonomyKey, params = {}) {
  const token = getAuthToken();
  const { level, parentId, limit = 1000, marker } = params;
  const url = `https://api.box.com/2.0/metadata_taxonomies/${namespace}/${taxonomyKey}/nodes?limit=${limit}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await response.json();
}

// 12. Update a node's display name and deprecated status
async function updateNodeInTaxonomy(namespace, taxonomyKey, nodeId, nodeData) {
  const token = getAuthToken();
  const url = `https://api.box.com/2.0/metadata_taxonomies/${namespace}/${taxonomyKey}/nodes/${nodeId}`;
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(nodeData),
  });
  return await response.json();
}

// 13. Delete a deprecated leaf node
async function deleteNodeFromTaxonomy(namespace, taxonomyKey, nodeId) {
  const token = getAuthToken();
  const url = `https://api.box.com/2.0/metadata_taxonomies/${namespace}/${taxonomyKey}/nodes/${nodeId}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (response.status === 204) {
    return 'Node deleted successfully';
  }
  return await response.json();
}

// 14. Create a new Metadata template with a Taxonomy field
async function createMetadataTemplate(templateData) {
  const token = getAuthToken();
  const url = '/metadata_templates/schema';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(templateData),
  });
  return await response.json();
}

// 15. Modify existing templates using JSON patch operations
async function updateMetadataTemplate(scope, templateKey, patchData) {
  const token = getAuthToken();
  const url = `https://api.box.com/2.0/metadata_templates/${scope}/${templateKey}/schema`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(patchData),
  });
  return await response.json();
}

// 16. Retrieve schema for a specific template
async function getMetadataTemplateSchema(scope, templateKey) {
  const token = getAuthToken();
  const url = `https://api.box.com/2.0/metadata_templates/${scope}/${templateKey}/schema`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await response.json();
}

// 17. Add an instance of a template to a file
async function addTemplateInstanceToFile(fileId, scope, templateKey, nodeIds) {
  const token = getAuthToken();
  const url = `https://api.box.com/2.0/files/${fileId}/metadata/${scope}/${templateKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ nodeIds }),
  });
  return await response.json();
}

// 18. Modify an instance's metadata
async function updateTemplateInstanceMetadata(fileId, scope, templateKey, patchData) {
  const token = getAuthToken();
  const url = `https://api.box.com/2.0/files/${fileId}/metadata/${scope}/${templateKey}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(patchData),
  });
  return await response.json();
}

// 19. Retrieve metadata for a file
async function getTemplateInstanceMetadata(fileId, scope, templateKey) {
  const token = getAuthToken();
  const url = `https://api.box.com/2.0/files/${fileId}/metadata/${scope}/${templateKey}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return await response.json();
}

function buildTreeFromFlatList(levels, entries) {
  const levelNames = levels.map(l => l.display_name);
  const nodeMap = {};
  const root = [];

  // First pass: map all nodes by ID
  entries.forEach(entry => {
    nodeMap[entry.id] = {
      [levelNames[entry.level - 1]]: entry.display_name,
      children: []
    };
  });

  // Second pass: link children to parents
  entries.forEach(entry => {
    const node = nodeMap[entry.id];
    if (entry.parentId) {
      const parent = nodeMap[entry.parentId];
      if (parent) parent.children.push(node);
    } else {
      root.push(node);
    }
  });

  return root;
}

function buildSchemaFromLevels(levels, index = 0) {
  if (index >= levels.length) return {};

  const currentKey = levels[index].display_name;
  const nextLevel = levels[index + 1]?.display_name;

  const schema = {
    type: "object",
    title: "", // hides "item 1"
    object_layout: "grid",
    properties: {
      id: {
        type: "string",
        default: "NEW",
        options: { hidden: true },
        //readOnly: true
      },
      [currentKey]: {
        type: "string",
        title: currentKey
      }
    },
    required: [currentKey]
  };

  if (nextLevel) {
    const isLastLevel = index + 1 === levels.length - 1;

    schema.properties[nextLevel] = {
      type: "array",
      title: nextLevel, // enables "Add City"
      format: isLastLevel ? "table" : undefined,
      items: {
        ...buildSchemaFromLevels(levels, index + 1),
        title: nextLevel // ✅ keep this for button labels
      }
    };

    if (isLastLevel) {
      schema.properties[nextLevel].items.properties[nextLevel].title = "";
    }
  }

  return schema;
}





function buildTreeWithLevels(levels, nodes) {
  const nodeMap = new Map();
  const roots = [];
  const levelMap = Object.fromEntries(levels.map(l => [l.level, l.display_name]));

  for (const node of nodes) {
    const levelName = levelMap[node.level];
    node[levelName] = node.display_name;

    const nextLevelName = levelMap[node.level + 1];
    if (nextLevelName) {
      node[nextLevelName] = [];  // this replaces "children"
    }

    nodeMap.set(node.id, node);
  }

  for (const node of nodes) {
    if (node.parent_id) {
      const parent = nodeMap.get(node.parent_id);
      const currentLevelName = levelMap[node.level];

      if (!parent[currentLevelName]) parent[currentLevelName] = [];
      parent[currentLevelName].push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}


function buildTreeFromFlatList(levels, entries) {
  const levelNames = levels.map(l => l.display_name);
  const nodeMap = {};
  const root = [];
  console.log(entries);

  // First pass: map all nodes by ID
  entries.forEach(entry => {
    nodeMap[entry.id] = {
      id: entry.id,
      [levelNames[entry.level - 1]]: entry.display_name,
      children: []
    };
  });
  // Second pass: link children to parents
  entries.forEach(entry => {
    const node = nodeMap[entry.id];
    if (entry.parentId) {
      const parent = nodeMap[entry.parentId];
      if (parent) parent.children.push(node);
    } else {
      root.push(node);
    }
  });

  return root;
}
function flattenTreeToEntries(tree, levels, level = 0, parentId = null, entries = []) {
  if (level >= levels.length) return entries;

  const levelKey = levels[level].display_name;

  tree.forEach(node => {
    if (!node || typeof node !== 'object') return;

    if (!node.id || node.id === 'NEW') {
      node.id = `NEW_${entries.length}`;
    }

    const id = node.id;
    const name = node[levelKey] || node.display_name || "Unnamed";

    entries.push({
      id: id,
      display_name: name,
      level: level + 1,
      parentId: parentId
    });

    const childKey = levels[level + 1]?.display_name;
    const children = node[childKey];

    if (Array.isArray(children)) {
      flattenTreeToEntries(children, levels, level + 1, id, entries);
    }
  });

  return entries;
}



function areNodesDifferent(original, current) {
  return (
    original.display_name !== current.display_name ||
    original.parentId !== current.parentId ||
    original.level !== current.level
  );
}



async function deleteNodes(nodes) {
  console.log('deleting (deprecating)');
  nodes.forEach(node => {
    console.log(node);
  })
}
async function updateNodes(nodes) {
  console.log('updating');
  for (const node of nodes) {
    console.log(node);
    await updateNodeInTaxonomy(namespace, taxonomyId, node.id, {
      displayName: node.display_name
    });
  }
}

async function createNodes(nodes) {
  const idMap = {}; // tempId → real Box ID
  setNodesToCreate(nodes.length);

  // Step 1: Assign tempIds to all NEW nodes
  let tempCounter = 0;
  for (const node of nodes) {
    if (node.id.startsWith('NEW')) {
      node.tempId = node.id; // Preserve "NEW_5" or "NEW_6"
    }
  }

  // Step 2: Build level-indexed groups
  const levelGroups = {};
  for (const node of nodes) {
    if (!levelGroups[node.level]) levelGroups[node.level] = [];
    levelGroups[node.level].push(node);
  }

  // Step 3: Process levels in order
  const levels = Object.keys(levelGroups).map(Number).sort((a, b) => a - b);

  for (const level of levels) {
    for (const node of levelGroups[level]) {
      const payload = {
        displayName: node.display_name,
        level: node.level
      };

      if (node.level > 1) {
        const parentRef = node.parent_id;  
        const resolvedParentId = parentRef?.startsWith('NEW_') ? idMap[parentRef] : parentRef;
      
        if (!resolvedParentId) {
          console.warn(`Skipping ${node.display_name}, unresolved parent_id: ${parentRef}`);
          continue;
        }
      
        payload.parentId = resolvedParentId;
      }
      

      try {
        const created = await addNodeToTaxonomy(namespace, taxonomyId, payload);
        incrementNodesCreated();
        if (node.tempId) {
          idMap[node.tempId] = created.id;
        }
        console.log("Created:", created.display_name, "→", created.id);
      } catch (err) {
        console.error("Failed to create node:", payload, err);
      }
    }
  }
}



function buildTree(rows, columns, level = 0) {
  if (level >= columns.length) return [];

  const currentColumn = columns[level];
  const grouped = {};

  for (const row of rows) {
    const key = row[currentColumn];
    if (!key) continue; // ✅ skip null/empty rows
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(row);
  }

  return Object.entries(grouped).map(([value, groupRows]) => {
    const node = {
      id: `new_${Date.now()}_${Math.random()}`,
      [currentColumn]: value
    };

    const children = buildTree(groupRows, columns, level + 1);
    if (children.length > 0) {
      node[columns[level + 1]] = children;
    }

    return node;
  });
}


function buildSchema(columns, level = 0) {
  if (level >= columns.length) return {};

  const key = columns[level];

  const schema = {
    type: "object",
    object_layout: "grid",
    title: key,
    properties: {
      id: {
        type: "string",
        default: "NEW",
        readOnly: true,
        options: { hidden: true }
      },
      [key]: { type: "string", title: key }
    }
  };

  if (level < columns.length - 1) {
    schema.properties.children = {
      type: "array",
      title: columns[level + 1],
      format: level + 1 === columns.length - 1 ? 'table' : undefined,
      items: buildSchema(columns, level + 1)
    };
  }

  return schema;
}

  



async function createNewTaxonomyTree(tree, levels, namespace, taxonomyKey) {
  taxonomyId = tree.key;
  const taxonomyDefinition = {
    key: tree.key,
    displayName: tree.displayName,
    namespace: namespace
  };
  let newTaxonomy =  await createTaxonomy(taxonomyDefinition);
  const levelData = taxonomyLevels.map(lvl => ({
    display_name: lvl.displayName,
    description: lvl.displayName
  }));
  
  await addLevelToTaxonomy(namespace, taxonomyKey, levelData);
      const flat = [];
  const tempIdMap = new Map(); // Map from internal NEW index to real ID
  let tempIdCounter = 1;

  // First, flatten with internal IDs to track hierarchy
  function flatten(nodeList, level = 0, parentTempId = null) {
    const key = levels[level].display_name;
    nodeList.forEach(node => {
      const tempId = `temp-${tempIdCounter++}`;
      const display_name = node[key];

      flat.push({
        tempId,
        display_name,
        level: level + 1,
        parentTempId
      });

      if (Array.isArray(node.children)) {
        flatten(node.children, level + 1, tempId);
      }
    });
  }

  flatten(tree.nodes);
  setNodesToCreate(flat.length);
  // Then create nodes in order and map tempId → real id
  for (const entry of flat) {
    const nodePayload = {
      display_name: entry.display_name,
      level: entry.level
    };

    if (entry.parentTempId) {
      const parentRealId = tempIdMap.get(entry.parentTempId);
      if (!parentRealId) {
        console.error("Missing parent ID for", entry);
        continue;
      }
      nodePayload.parentId = parentRealId;
    }

    try {
      const realNode = await addNodeToTaxonomy(namespace, taxonomyId, nodePayload);
      incrementNodesCreated();
      tempIdMap.set(entry.tempId, realNode.id);
      console.log("✅ Created:", realNode);
    } catch (err) {
      console.error(" Failed to create node:", nodePayload, err);
    }
  }

  console.log("All nodes created!");
}
