import { defineStore } from 'pinia';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://reubens-farm-s.vercel.app'
    : typeof window !== 'undefined' && window.location.hostname === '10.1.45.30'
    ? 'http://10.1.45.30:3000'
    : 'http://localhost:3000';

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [],
  }),
  actions: {
    async fetchProjects() {
      console.log('Fetching projects...');
      try {
        const response = await fetch(`${baseURL}/api/projects`);
        console.log('Response received:', response);
        const data = await response.json();
        console.log('Data parsed successfully:', data);
        if (response.ok) {
          console.log('Successfully fetched projects.');
          this.projects = data.map((project) => ({
            ...project,
            laborTable: project.laborTable || [], // Initialize
            landPrepTable: project.landPrepTable || [], // Initialize
            harvestTable: project.harvestTable || [], // Initialize
            sprayingTable: project.sprayingTable || [], // Already present
            fertilizerTable: project.fertilizerTable || [], // Already present
            progressTable: project.progressTable || [], // Initialize
            isPinned: project.status === 'pin',
          }));
          console.log('Projects stored successfully:', this.projects);
        } else {
          throw new Error(data.statusMessage || 'Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        alert('Error fetching projects: ' + error.message);
      }
    },

    async addProject(project) {
      try {
        const response = await fetch(`${baseURL}/api/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...project,
            laborTable: [], // Initialize
            landPrepTable: [], // Initialize
            harvestTable: [], // Initialize
            sprayingTable: [], // Already present
            fertilizerTable: [], // Already present
            progressTable: [], // Initialize
          }),
        });
        const data = await response.json();
        if (response.ok) {
          this.projects.push({
            ...project,
            id: data.id,
            laborTable: [], // Initialize
            landPrepTable: [], // Initialize
            harvestTable: [], // Initialize
            sprayingTable: [], // Already present
            fertilizerTable: [], // Already present
            progressTable: [], // Initialize
            isPinned: false,
          });
          return data.id;
        } else {
          throw new Error(data.statusMessage || 'Unknown error');
        }
      } catch (error) {
        console.error('Error adding project:', error);
        alert('Error adding project: ' + error.message);
        throw error;
      }
    },

    async getProjectById(projectId) {
      try {
        const project = this.projects.find((p) => p.id === projectId);
        if (project) return project;

        // Fetch from API if not found in state
        const response = await fetch(`${baseURL}/api/projects/${projectId}`);
        const data = await response.json();
        if (response.ok) {
          const project = {
            ...data,
            laborTable: data.laborTable || [],
            landPrepTable: data.landPrepTable || [],
            harvestTable: data.harvestTable || [],
            sprayingTable: data.sprayingTable || [],
            fertilizerTable: data.fertilizerTable || [],
            progressTable: data.progressTable || [],
            isPinned: data.status === 'pin',
          };
          this.projects.push(project); // Cache in state
          return project;
        } else {
          throw new Error(data.statusMessage || 'Failed to fetch project');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        throw error;
      }
    },

    // Other actions (deleteProject, togglePinProject, updateProjectStatus, addLaborRecord, etc.) remain unchanged
    async deleteProject(projectId) {
      try {
        const response = await fetch(`${baseURL}/api/projects/${projectId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          this.projects = this.projects.filter((project) => project.id !== projectId);
        } else {
          const data = await response.json();
          throw new Error(data.statusMessage || 'Failed to delete project');
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project: ' + error.message);
        throw error;
      }
    },

    async togglePinProject(projectId) {
      try {
        const project = this.projects.find((p) => p.id === projectId);
        if (!project) throw new Error('Project not found');
        const newStatus = project.isPinned ? '' : 'pin';
        await this.updateProjectStatus(projectId, newStatus);
      } catch (error) {
        console.error('Error toggling pin status:', error);
        alert('Error togg escritorio pin status: ' + error.message);
        throw error;
      }
    },

    async updateProjectStatus(projectId, status) {
      try {
        const response = await fetch(`${baseURL}/api/updateStatus`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId, status }),
        });
        if (!response.ok) {
          throw new Error('Failed to update project status');
        }
        const index = this.projects.findIndex((p) => p.id === projectId);
        if (index !== -1) {
          this.projects[index].status = status;
          this.projects[index].isPinned = status === 'pin';
        }
      } catch (error) {
        console.error('Error updating project status:', error);
        throw error;
      }
    },

    async addSprayingRecord(projectId, record) {
      try {
        const response = await fetch(`${baseURL}/api/sprayingRecords`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId, ...record }),
        });
        const data = await response.json();

        if (response.ok) {
          const project = this.projects.find((p) => p.id === projectId);
          if (project) {
            project.sprayingTable = project.sprayingTable || [];
            project.sprayingTable.push({ ...record, id: data.id });
          }
          return data.id;
        } else {
          throw new Error(data.statusMessage || 'Failed to add spraying record');
        }
      } catch (error) {
        console.error('Error adding spraying record:', error);
        alert('Error adding spraying record: ' + error.message);
        throw error;
      }
    },

    async addFertilizerRecord(projectId, record) {
      try {
        const response = await fetch(`${baseURL}/api/fertilizerRecords`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId, ...record }),
        });
        const data = await response.json();

        if (response.ok) {
          const project = this.projects.find((p) => p.id === projectId);
          if (project) {
            project.fertilizerTable = project.fertilizerTable || [];
            project.fertilizerTable.push({ ...record, id: data.id });
          }
          return data.id;
        } else {
          throw new Error(data.statusMessage || 'Failed to add fertilizer record');
        }
      } catch (error) {
        console.error('Error adding fertilizer record:', error);
        alert('Error adding fertilizer record: ' + error.message);
        throw error;
      }
    },

    async addLaborRecord(projectId, record) {
      try {
        const response = await fetch(`${baseURL}/api/laborRecord`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId, ...record }),
        });
        const data = await response.json();

        if (response.ok) {
          const project = this.projects.find((p) => p.id === projectId);
          if (project) {
            project.laborTable = project.laborTable || [];
            project.laborTable.push({ ...record, id: data.id });
          }
          return data.id;
        } else {
          throw new Error(data.statusMessage || 'Failed to add labor record');
        }
      } catch (error) {
        console.error('Error adding labor record:', error);
        alert('Error adding labor record: ' + error.message);
        throw error;
      }
    },

    async addHarvestRecord(projectId, record) {
      try {
        const response = await fetch(`${baseURL}/api/harvestRecords`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId, ...record }),
        });
        const data = await response.json();

        if (response.ok) {
          const project = this.projects.find((p) => p.id === projectId);
          if (project) {
            project.harvestTable = project.harvestTable || [];
            project.harvestTable.push({ ...record, id: data.id });
          }
          return data.id;
        } else {
          throw new Error(data.statusMessage || 'Failed to add harvest record');
        }
      } catch (error) {
        console.error('Error adding harvest record:', error);
        alert('Error adding harvest record: ' + error.message);
        throw error;
      }
    },

    async addLandPrepRecord(projectId, record) {
      try {
        const response = await fetch(`${baseURL}/api/landPrepRecords`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId, ...record }),
        });
        const data = await response.json();

        if (response.ok) {
          const project = this.projects.find((p) => p.id === projectId);
          if (project) {
            project.landPrepTable = project.landPrepTable || [];
            project.landPrepTable.push({ ...record, id: data.id });
          }
          return data.id;
        } else {
          throw new Error(data.statusMessage || 'Failed to add land prep record');
        }
      } catch (error) {
        console.error('Error adding land prep record:', error);
        alert('Error adding land prep record: ' + error.message);
        throw error;
      }
    },

    async addProgressPrepRecord(projectId, record, imageFile) {
      try {
        const formData = new FormData();
        formData.append('projectId', projectId);
        formData.append('date', record.date);
        formData.append('stage', record.stage);

        if (imageFile) {
          formData.append('image', imageFile);
        }

        const response = await fetch(`${baseURL}/api/progressRecords`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          const project = this.projects.find((p) => p.id === projectId);
          if (project) {
            project.progressTable = project.progressTable || [];
            project.progressTable.push({
              ...record,
              id: data.id,
              imageUrl: data.imageUrl,
            });
          }
          return data.id;
        } else {
          throw new Error(data.error || 'Failed to upload progress record');
        }
      } catch (error) {
        console.error('Error adding progress record:', error);
        alert('Error adding progress record: ' + error.message);
        throw error;
      }
    },
  },
});