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
    //method: 'PATCH',
    method: 'PUT',
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

// 11. Retrieve multiple nodes with pagination
async function getNodes(namespace, taxonomyKey, params = {}) {
  const token = getAuthToken();
  const { level, parentId, limit = 200, marker } = params; // Use Box API limit of 200
  
  let allNodes = [];
  let currentMarker = marker;
  
  do {
    // Build URL with current marker if available
    let url = `https://api.box.com/2.0/metadata_taxonomies/${namespace}/${taxonomyKey}/nodes?limit=${limit}`;
    if (currentMarker) {
      url += `&marker=${currentMarker}`;
    }
    
    console.log(`📥 Fetching nodes: ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch nodes: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`📥 Received ${data.entries?.length || 0} nodes, next_marker: ${data.next_marker || 'null'}`);
    
    // Add nodes from this page to our collection
    if (data.entries && Array.isArray(data.entries)) {
      allNodes = allNodes.concat(data.entries);
    }
    
    // Update marker for next iteration
    currentMarker = data.next_marker;
    
  } while (currentMarker); // Continue until no more pages (next_marker is null)
  
  console.log(`✅ Total nodes fetched: ${allNodes.length}`);
  return { entries: allNodes };
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

function buildTreeWithLevels(levels, nodes) {
  const nodeMap = new Map();
  const roots = [];
  const levelMap = Object.fromEntries(levels.map(l => [l.level, l.displayName]));

  for (const node of nodes) {
    const levelName = levelMap[node.level];
    node[levelName] = node.displayName;

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

function buildTreeFromFlatList(entries) {
  const nodeMap = {};
  const roots = [];

  entries.forEach(entry => {
    nodeMap[entry.id] = { ...entry };
  });

  entries.forEach(entry => {
    if (entry.parentId) {
      const parent = nodeMap[entry.parentId];
      if (parent) {
        if (!parent.children) parent.children = [];
        parent.children.push(nodeMap[entry.id]);
      }
    } else {
      roots.push(nodeMap[entry.id]);
    }
  });

  // Optionally prune empty children arrays for leaves
  function pruneChildren(node) {
    if (node.children) {
      node.children.forEach(pruneChildren);
      if (node.children.length === 0) delete node.children;
    }
  }
  roots.forEach(pruneChildren);

  return roots;
}

function areNodesDifferent(original, current) {
  return (
    original.displayName !== current.displayName ||
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
      displayName: node.displayName
    });
  }
}

async function createNodes(nodes) {
  const idMap = {}; // tempId → real Box ID
  setNodesToCreate(nodes.length);
  
  console.log(`🚀 Starting node creation for ${nodes.length} nodes with multi-threading (max 6 concurrent)`);
  const startTime = Date.now();

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

  // Step 3: Process levels in order with multi-threading for same-level nodes
  const levels = Object.keys(levelGroups).map(Number).sort((a, b) => a - b);

  for (const level of levels) {
    const levelNodes = levelGroups[level];
    console.log(`🚀 Processing level ${level} with ${levelNodes.length} nodes`);
    
    // Process same-level nodes in parallel (max 6 concurrent requests)
    const maxConcurrent = 6;
    const chunks = [];
    
    // Split nodes into chunks of maxConcurrent
    for (let i = 0; i < levelNodes.length; i += maxConcurrent) {
      chunks.push(levelNodes.slice(i, i + maxConcurrent));
    }
    
    // Process chunks sequentially, but nodes within each chunk in parallel
    for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
      const chunk = chunks[chunkIndex];
      console.log(`📦 Processing chunk ${chunkIndex + 1}/${chunks.length} with ${chunk.length} nodes`);
      
      // Process all nodes in this chunk concurrently
      const chunkPromises = chunk.map(async (node) => {
        const payload = {
          displayName: node.displayName,
          level: node.level
        };

        if (node.level > 1) {
          const parentRef = node.parent_id;  
          const resolvedParentId = parentRef?.startsWith('NEW_') ? idMap[parentRef] : parentRef;
        
          if (!resolvedParentId) {
            console.log(`⚠️ Skipping ${node.displayName}, unresolved parent_id: ${parentRef}`);
            return null; // Return null for skipped nodes
          }
        
          payload.parentId = resolvedParentId;
        }

        try {
          const created = await addNodeToTaxonomy(namespace, taxonomyId, payload);
          incrementNodesCreated();
          if (node.tempId) {
            idMap[node.tempId] = created.id;
          }
          console.log(`✅ Created: ${created.displayName} → ${created.id}`);
          return created;
        } catch (err) {
          console.error(`❌ Failed to create node:`, payload, err);
          return null; // Return null for failed nodes
        }
      });
      
      // Wait for all nodes in this chunk to complete before moving to next chunk
      const chunkResults = await Promise.all(chunkPromises);
      const successfulNodes = chunkResults.filter(result => result !== null);
      console.log(`📊 Chunk ${chunkIndex + 1} completed: ${successfulNodes.length}/${chunk.length} nodes created successfully`);
    }
  }
  
  const endTime = Date.now();
  const totalTime = endTime - startTime;
  console.log(`🎉 Node creation completed in ${totalTime}ms for ${nodes.length} nodes`);
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
      [currentColumn]: value,
      level: level + 1  // Add the level property
    };

    const children = buildTree(groupRows, columns, level + 1);
    if (children.length > 0) {
      node[columns[level + 1]] = children;
    }

    return node;
  });
}

async function createNewTaxonomyTree(tree, levels, namespace, taxonomyKey) {
  const displayName = $('#taxonomyDisplayName').val().trim() || tree.displayName || "New Taxonomy";
  const key = $('#taxonomyKey').val().trim() || taxonomyKey || "new_taxonomy";
  taxonomyId = key;

  // 1. Create the taxonomy
  const taxonomyDefinition = {
    key,
    displayName,
    namespace
  };
  const newTaxonomy = await createTaxonomy(taxonomyDefinition);

  // 2. Add all levels
  const levelData = levels.map(lvl => ({
    displayName: lvl.displayName,
    description: lvl.displayName
  }));
  await addLevelToTaxonomy(namespace, taxonomyId, levelData);

  // 3. Flatten the tree using tempId/parentTempId
  const flat = flattenForCreate(tree.nodes, levels);
  setNodesToCreate(flat.length);

  const tempIdMap = new Map();

  // 4. Create nodes in order with multi-threading for same-level nodes
  console.log(`🚀 Starting node creation for new taxonomy with ${flat.length} nodes using multi-threading (max 6 concurrent)`);
  const startTime = Date.now();
  
  // Group nodes by level for parallel processing
  const levelGroups = {};
  for (const entry of flat) {
    if (!levelGroups[entry.level]) levelGroups[entry.level] = [];
    levelGroups[entry.level].push(entry);
  }
  
  // Process levels in order (maintain hierarchy)
  const levelKeys = Object.keys(levelGroups).map(Number).sort((a, b) => a - b);
  
  for (const level of levelKeys) {
    const levelNodes = levelGroups[level];
    console.log(`🚀 Processing level ${level} with ${levelNodes.length} nodes`);
    
    // Process same-level nodes in parallel (max 6 concurrent requests)
    const maxConcurrent = 6;
    const chunks = [];
    
    // Split nodes into chunks of maxConcurrent
    for (let i = 0; i < levelNodes.length; i += maxConcurrent) {
      chunks.push(levelNodes.slice(i, i + maxConcurrent));
    }
    
    // Process chunks sequentially, but nodes within each chunk in parallel
    for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
      const chunk = chunks[chunkIndex];
      console.log(`📦 Processing chunk ${chunkIndex + 1}/${chunks.length} with ${chunk.length} nodes`);
      
      // Process all nodes in this chunk concurrently
      const chunkPromises = chunk.map(async (entry) => {
        const nodePayload = {
          displayName: entry.displayName,
          level: entry.level
        };

        if (entry.parentTempId) {
          const parentRealId = tempIdMap.get(entry.parentTempId);
          if (!parentRealId) {
            console.error("Missing parent ID for:", entry);
            return null; // Return null for failed nodes
          }
          nodePayload.parentId = parentRealId;
        }

        try {
          const realNode = await addNodeToTaxonomy(namespace, taxonomyId, nodePayload);
          incrementNodesCreated();
          tempIdMap.set(entry.tempId, realNode.id);
          console.log(`✅ Created: ${realNode.displayName} → ${realNode.id}`);
          return realNode;
        } catch (err) {
          console.error(`❌ Failed to create node:`, nodePayload, err);
          return null; // Return null for failed nodes
        }
      });
      
      // Wait for all nodes in this chunk to complete before moving to next chunk
      const chunkResults = await Promise.all(chunkPromises);
      const successfulNodes = chunkResults.filter(result => result !== null);
      console.log(`📊 Chunk ${chunkIndex + 1} completed: ${successfulNodes.length}/${chunk.length} nodes created successfully`);
    }
  }
  
  const endTime = Date.now();
  const totalTime = endTime - startTime;
  console.log(`🎉 New taxonomy creation completed in ${totalTime}ms for ${flat.length} nodes`);

  console.log("✅ All nodes created for new taxonomy!");
}

function flattenForCreate(tree, levels) {
  const flat = [];
  let tempIdCounter = 1;

  function walk(nodes, level = 0, parentTempId = null) {
    const levelName = levels[level]?.displayName;

    for (const node of nodes) {
      const tempId = `temp-${tempIdCounter++}`;
      const displayName = node[levelName] || node.displayName || node.text || "Unnamed";

      flat.push({
        tempId,
        displayName,
        level: level + 1,       // ✅ correct level assignment
        parentTempId: parentTempId || null  // ✅ maintain hierarchy
      });

      const childKey = levels[level + 1]?.displayName;
      const children = node[childKey] || node.children;

      if (Array.isArray(children)) {
        walk(children, level + 1, tempId);
      }

    }
  }

  walk(tree);
  return flat;
}

function convertNestedToJsTree(nodes, maxLevel) {
  return nodes.map(node => {
    console.log('Converting node:', node);
    console.log('Max level:', maxLevel, 'Node level:', node.level);
    
    // Find the display name from the dynamic properties
    // The buildTree function creates nodes with properties like [columnName]: value
    let displayName = node.displayName;
    if (!displayName) {
      // Look for the first property that's not 'id' or 'children'
      const keys = Object.keys(node).filter(key => key !== 'id' && key !== 'children');
      if (keys.length > 0) {
        displayName = node[keys[0]];
        console.log('Found display name from property:', keys[0], '=', displayName);
      }
    }
    
    if (!displayName) {
      displayName = 'Unnamed';
      console.warn('No display name found for node:', node);
    }
    
    const isLastLevel = node.level === maxLevel;
    const item = {
      id: node.id,
      text: displayName,
      icon: isLastLevel ? 'jstree-file' : 'jstree-folder'
    };
    
    // Handle children - look for the next level property or children array
    if (node.children && node.children.length > 0) {
      item.children = convertNestedToJsTree(node.children, maxLevel);
    } else {
      // Check if there are dynamic children properties
      const keys = Object.keys(node).filter(key => key !== 'id' && key !== 'displayName');
      for (const key of keys) {
        if (Array.isArray(node[key]) && node[key].length > 0) {
          console.log('Found children in property:', key, 'count:', node[key].length);
          item.children = convertNestedToJsTree(node[key], maxLevel);
          break;
        }
      }
    }
    
    console.log('Converted item:', item);
    return item;
  });
}
