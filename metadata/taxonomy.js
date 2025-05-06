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
  
    const schema = {
      type: "object",
      object_layout: "grid",
      title: currentKey,
      properties: {
        id: {
          type: "string",
          default: "NEW",
          options: { hidden: true },
          readOnly: true
        },
        [currentKey]: {
          type: "string",
          title: currentKey
        }
      },
      required: [currentKey]  // optional but nice
    };
  
    if (index < levels.length - 1) {
      schema.properties.children = {
        type: "array",
        title: levels[index + 1].display_name,
        format: index + 1 === levels.length - 1 ? 'table' : undefined,
        items: buildSchemaFromLevels(levels, index + 1)
      };
    }
  
    return schema;
  }
  
  
  function buildTreeWithLevels(levels,nodes) {
    const nodeMap = new Map();
    const roots = [];
    const levelMap = Object.fromEntries(levels.map(l => [l.level, l.display_name]));
  
    // Step 1: enrich nodes
    for (const node of nodes) {
      const levelName = levelMap[node.level];
      node[levelName] = node.display_name;
      node.children = [];
      nodeMap.set(node.id, node);
    }
  
    // Step 2: build tree
    for (const node of nodes) {
      if (node.parent_id) {
        const parent = nodeMap.get(node.parent_id);
        if (parent) {
          parent.children.push(node);
        } else {
          console.warn(`Missing parent for ${node.display_name}: ${node.parent_id}`);
        }
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
      if (!node || typeof node !== 'object') return; // skip bad nodes
  
      const id = node.id || "NEW";
      const name = node[levelKey] || "Unnamed";
  
      entries.push({
        id: id,
        display_name: name,
        level: level + 1,
        parentId: parentId || null
      });
  
      if (Array.isArray(node.children)) {
        flattenTreeToEntries(node.children, levels, level + 1, id, entries);
      }
    });
  
    return entries;
  }
  

  function areNodesDifferent(original, current) {
    
    return (
      original.display_name?.trim() !== current.display_name?.trim() ||
      (original.parentId || null) !== (current.parentId || null)
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
    nodes.forEach(node => {
      console.log(node);
    })
  }
  async function createNodes(nodes) {
    const idMap = {}; // tempId -> real ID
    setNodesToCreate(nodes.length);
  
    // Step 1: Assign tempIds to all NEW nodes
    let tempCounter = 0;
    for (const node of nodes) {
      if (node.id === 'NEW') {
        node.tempId = `temp_${tempCounter++}`;
      }
    }
  
    // Step 2: Fix up parentId references
    for (const node of nodes) {
      if (node.parentId === 'NEW') {
        // Find the most recent NEW node at level - 1
        const potentialParent = nodes.find(
          n =>
            n.id === 'NEW' &&
            n.level === node.level - 1
        );
  
        if (potentialParent && potentialParent.tempId) {
          node.parentId = potentialParent.tempId;
        } else {
          console.warn(`Unable to resolve parentId for node "${node.display_name}"`);
        }
      }
    }
  
    // Step 3: Sort nodes by level so parents are created before children
    const sortedNodes = [...nodes].sort((a, b) => a.level - b.level);
  
    // Step 4: Create nodes in order
    for (const node of sortedNodes) {
      const resolvedParentId = idMap[node.parentId] || node.parentId;
  
      const created = await addNodeToTaxonomy(namespace, taxonomyId, {
        ...node,
        parentId: resolvedParentId,
      });
  
      if (node.tempId) {
        idMap[node.tempId] = created.id;
      }
  
      incrementNodesCreated();
    }
  }
  
  
  function buildTree(data, columns) {
    const root = [];
    const pointers = new Array(columns.length).fill(null);
  
    data.forEach(row => {
      for (let i = 0; i < columns.length; i++) {
        const key = columns[i];
        const value = row[key];
  
        if (value) {
          const node = { [key]: value, id: "NEW" };
          if (i < columns.length - 1) node.children = [];
  
          if (i === 0) {
            root.push(node);
          } else {
            const parent = pointers[i - 1];
            if (parent && parent.children) {
              parent.children.push(node);
            }
          }
  
          pointers[i] = node;
          for (let j = i + 1; j < columns.length; j++) {
            pointers[j] = null;
          }
          break;
        }
      }
    });
  
    return root;
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
      display_name: tree.display_name,
      namespace: namespace
    };
    let newTaxonomy =  await createTaxonomy(taxonomyDefinition);
    for (const lvl of taxonomyLevels) {
      await addLevelToTaxonomy(namespace, taxonomyDefinition.key, {
        display_name: lvl.display_name,
        description:lvl.display_name
      });
    }    const flat = [];
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
  