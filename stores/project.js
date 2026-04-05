import { defineStore } from 'pinia';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://mtn-farm-s.vercel.app/'
    : typeof window !== 'undefined' && window.location.hostname === '10.1.45.30'
    ? 'http://10.1.45.30:3000'
    : 'http://localhost:3000';

const getAuthHeaders = () => {
  const t = process.client ? localStorage.getItem('auth_token') : null;
  return t ? { Authorization: `Bearer ${t}` } : {};
};

const normalizeProject = (data) => ({
  ...data,
  laborTable: data.laborTable || [],
  landPrepTable: data.landPrepTable || [],
  harvestTable: data.harvestTable || [],
  sprayingTable: data.sprayingTable || [],
  fertilizerTable: data.fertilizerTable || [],
  progressTable: data.progressTable || [],
  isPinned: data.status === 'pin',
});

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [],
  }),
  actions: {
    async fetchProjects() {
      try {
        const response = await fetch(`${baseURL}/api/projects`, { headers: getAuthHeaders() });
        const data = await response.json();
        if (response.ok) {
          this.projects = data.map(normalizeProject);
        } else {
          throw new Error(data.statusMessage || 'Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
      }
    },

    async addProject(project) {
      try {
        const response = await fetch(`${baseURL}/api/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
          body: JSON.stringify({
            ...project,
            laborTable: [],
            landPrepTable: [],
            harvestTable: [],
            sprayingTable: [],
            fertilizerTable: [],
            progressTable: [],
          }),
        });
        const data = await response.json();
        if (response.ok) {
          this.projects.push(normalizeProject({ ...project, id: data.id, status: '' }));
          return data.id;
        } else {
          throw new Error(data.statusMessage || 'Unknown error');
        }
      } catch (error) {
        console.error('Error adding project:', error);
        throw error;
      }
    },

    async getProjectById(projectId) {
      const cached = this.projects.find((p) => p.id === projectId);
      if (cached) return cached;

      const response = await fetch(`${baseURL}/api/projects/${projectId}`, { headers: getAuthHeaders() });
      const data = await response.json();
      if (response.ok) {
        const project = normalizeProject({ ...data, id: projectId });
        this.projects.push(project);
        return project;
      } else {
        throw new Error(data.statusMessage || 'Failed to fetch project');
      }
    },

    async deleteProject(projectId) {
      try {
        const response = await fetch(`${baseURL}/api/projects/${projectId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
        });
        if (response.ok) {
          this.projects = this.projects.filter((p) => p.id !== projectId);
        } else {
          const data = await response.json();
          throw new Error(data.statusMessage || 'Failed to delete project');
        }
      } catch (error) {
        console.error('Error deleting project:', error);
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
        throw error;
      }
    },

    async updateProjectStatus(projectId, status) {
      try {
        const response = await fetch(`${baseURL}/api/updateStatus`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
          body: JSON.stringify({ projectId, status }),
        });
        if (!response.ok) throw new Error('Failed to update project status');
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

    async addLaborRecord(projectId, record) {
      try {
        const response = await fetch(`${baseURL}/api/laborRecord`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
          body: JSON.stringify({ projectId, ...record }),
        });
        const data = await response.json();
        if (response.ok) {
          const project = this.projects.find((p) => p.id === projectId);
          if (project) project.laborTable.push({ ...record, id: data.id });
          return data.id;
        } else {
          throw new Error(data.statusMessage || 'Failed to add labor record');
        }
      } catch (error) {
        console.error('Error adding labor record:', error);
        throw error;
      }
    },

    async addHarvestRecord(projectId, record) {
      try {
        const response = await fetch(`${baseURL}/api/harvestRecords`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
          body: JSON.stringify({ projectId, ...record }),
        });
        const data = await response.json();
        if (response.ok) {
          const project = this.projects.find((p) => p.id === projectId);
          if (project) project.harvestTable.push({ ...record, id: data.id });
          return data.id;
        } else {
          throw new Error(data.statusMessage || 'Failed to add harvest record');
        }
      } catch (error) {
        console.error('Error adding harvest record:', error);
        throw error;
      }
    },

    async addLandPrepRecord(projectId, record) {
      try {
        const response = await fetch(`${baseURL}/api/landPrepRecords`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
          body: JSON.stringify({ projectId, ...record }),
        });
        const data = await response.json();
        if (response.ok) {
          const project = this.projects.find((p) => p.id === projectId);
          if (project) project.landPrepTable.push({ ...record, id: data.id });
          return data.id;
        } else {
          throw new Error(data.statusMessage || 'Failed to add land prep record');
        }
      } catch (error) {
        console.error('Error adding land prep record:', error);
        throw error;
      }
    },

    async addSprayingRecord(projectId, record) {
      try {
        const response = await fetch(`${baseURL}/api/sprayingRecords`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
          body: JSON.stringify({ projectId, ...record }),
        });
        const data = await response.json();
        if (response.ok) {
          const project = this.projects.find((p) => p.id === projectId);
          if (project) project.sprayingTable.push({ ...record, id: data.id });
          return data.id;
        } else {
          throw new Error(data.statusMessage || 'Failed to add spraying record');
        }
      } catch (error) {
        console.error('Error adding spraying record:', error);
        throw error;
      }
    },

    async addFertilizerRecord(projectId, record) {
      try {
        const response = await fetch(`${baseURL}/api/fertilizerRecords`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
          body: JSON.stringify({ projectId, ...record }),
        });
        const data = await response.json();
        if (response.ok) {
          const project = this.projects.find((p) => p.id === projectId);
          if (project) project.fertilizerTable.push({ ...record, id: data.id });
          return data.id;
        } else {
          throw new Error(data.statusMessage || 'Failed to add fertilizer record');
        }
      } catch (error) {
        console.error('Error adding fertilizer record:', error);
        throw error;
      }
    },

    async addProgressPrepRecord(projectId, record, imageFile) {
      try {
        const formData = new FormData();
        formData.append('projectId', projectId);
        formData.append('date', record.date);
        formData.append('stage', record.stage);
        if (imageFile) formData.append('image', imageFile);

        const response = await fetch(`${baseURL}/api/progressRecords`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: formData,
        });
        const data = await response.json();
        if (response.ok) {
          const project = this.projects.find((p) => p.id === projectId);
          if (project) project.progressTable.push({ ...record, id: data.id, imageUrl: data.imageUrl });
          return data.id;
        } else {
          throw new Error(data.error || 'Failed to upload progress record');
        }
      } catch (error) {
        console.error('Error adding progress record:', error);
        throw error;
      }
    },
  },
});
