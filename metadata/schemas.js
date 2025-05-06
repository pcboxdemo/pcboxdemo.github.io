var currentSchema = {
    "type": "array",
    "title": "Root Level Nodes",
    "items": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "title": "ID",
          "default": "NEW",
          "readOnly": true,
          "object_layout": "grid",
          "format": "table"
        },
        "displayName": {
          "type": "string",
          "title": "Display Name",
          "object_layout": "grid",
          "format": "table"
        },
        "level": {
          "type": "integer",
          "title": "Level",
          "object_layout": "grid",
          "format": "table"
        },
        "parentId": {
          "type": "string",
          "title": "Parent ID",
          "default": null,
          "object_layout": "grid",
          "format": "table"
        },
        "children": {
          "type": "array",
          "title": "Children",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string",
                "title": "ID",
                "default": "NEW",
                "readOnly": true,
                "object_layout": "grid",
                "format": "table"
              },
              "displayName": {
                "type": "string",
                "title": "Display Name",
                "object_layout": "grid",
                "format": "table"
              },
              "level": {
                "type": "integer",
                "title": "Level",
                "object_layout": "grid",
                "format": "table"
              },
              "parentId": {
                "type": "string",
                "title": "Parent ID",
                "default": null,
                "object_layout": "grid",
                "format": "table"
              },
              "children": {
                "type": "array",
                "title": "Children",
                "items": {}
              }
            }
          }
        }
      }
    }
  }
  


var currentSchemabut1 = {
    "title": "Taxonomy",
    "$ref": "#/definitions/taxonomy",
    "definitions": {
      "taxonomy": {
        "title": "Taxonomy",
        "type": "object",
        "properties": {
          "type": { "type": "string", "readOnly": true },
          "key": { "type": "string" },
          "displayName": { "type": "string" },
          "namespace": { "type": "string", "readOnly": true },
          "id": { "type": "string", "default": "NEW", "readOnly": true },
          "levels": {
            "title": "Levels",
            "type": "array",
            "items": { "$ref": "#/definitions/level" }
          }
        }
      },
      "level": {
        "title": "Level",
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "title": "Level Name"
          },
          "children": {
            "type": "array",
            "items": { "$ref": "#/definitions/level" },
            "title": "Children"
          }
        }
      }
    }
  }
  


var oldBut1 = {
    "title": "Taxonomy",
    "$ref": "#/definitions/taxonomy",
    "definitions": {
      "taxonomy": {
        "title": "Taxonomy",
        "type": "object",
        "properties": {
          "type": { "type": "string", "readOnly": true },
          "key": { "type": "string" },
          "displayName": { "type": "string" },
          "id": { "type": "string", "default": "NEW", "readOnly": true },
          "levels": {
            "title": "Levels",
            "type": "array",
            "items": { "$ref": "#/definitions/level" }
          }
        }
      },
      "level": {
        "title": "Level",
        "type": "object",
        "properties": {
          "displayName": { "type": "string" },
          "description": { "type": "string" },
          "level": { "type": "number" },
          "nodes": {
            "title": "Nodes",
            "type": "array",
            "format": "table",
            "items": { "$ref": "#/definitions/node" }
          }
        }
      },
      "node": {
        "title": "Node",
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "default": "NEW",
            "readOnly": true,
            "options": { "hidden": true }
          },
          "displayName": { "type": "string" },
          "level": { "type": "number" }
        },
        "oneOf": [
          {
            "properties": {
              "children": {
                "type": "array",
                "title": "Children",
                "items": { "$ref": "#/definitions/node" }
              }
            }
          }
        ]
      }
    }
  }