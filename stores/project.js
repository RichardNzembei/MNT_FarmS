import { defineStore } from "pinia";
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://reubens-farm-s.vercel.app"
    : typeof window !== "undefined" && window.location.hostname === "10.1.45.30"
    ? "http://10.1.45.30:3000"
    : "http://localhost:3000";
export const useProjectStore = defineStore("projects", {
  state: () => ({
    projects: [],
  }),
  actions: {
    async fetchProjects() {
      console.log("Fetching projects...");

      try {
        const response = await fetch(`${baseURL}/api/projects`);
        console.log("Response received:", response);

        const data = await response.json();
        console.log("Data parsed successfully:", data);

        if (response.ok) {
          console.log("Successfully fetched projects.");

          this.projects = data.map((project) => ({
            ...project,
            sprayingTable: project.sprayingTable || [],
            fertilizerTable: project.fertilizerTable || [],
          }));

          console.log("Projects stored successfully:", this.projects);
        } else {
          throw new Error(data.statusMessage || "Failed to fetch projects");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        alert("Error fetching projects: " + error.message);
      }
    },

    async addProject(project) {
      try {
        const response = await fetch(`${baseURL}/api/projects`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...project,
            sprayingTable: [],
            fertilizerTable: [],
          }),
        });

        const data = await response.json();
        if (response.ok) {
          this.projects.push({
            ...project,
            id: data.id,
            sprayingTable: [],
            fertilizerTable: [],
          });
          return data.id;
        } else {
          throw new Error(data.statusMessage || "Unknown error");
        }
      } catch (error) {
        console.error("Error adding project:", error);
        alert("Error adding project: " + error.message);
        throw error;
      }
    },

    async addSprayingRecord(projectId, record) {
      try {
        const response = await fetch(`${baseURL}/api/sprayingRecords`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
          throw new Error(
            data.statusMessage || "Failed to add spraying record"
          );
        }
      } catch (error) {
        console.error("Error adding spraying record:", error);
        alert("Error adding spraying record: " + error.message);
        throw error;
      }
    },

    async addFertilizerRecord(projectId, record) {
      try {
        const response = await fetch(`${baseURL}/api/fertilizerRecords`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
          throw new Error(
            data.statusMessage || "Failed to add fertilizer record"
          );
        }
      } catch (error) {
        console.error("Error adding fertilizer record:", error);
        alert("Error adding fertilizer record: " + error.message);
        throw error;
      }
    },
    // Client method to add a labor record for a project
    async addLaborRecord(projectId, record) {
      try {
        // Post the new record to the API
        const response = await fetch(`${baseURL}/api/laborRecord`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId, ...record }),
        });
        const data = await response.json();

        if (response.ok) {
          // Update the local project labor table
          const project = this.projects.find((p) => p.id === projectId);
          if (project) {
            project.laborTable = project.laborTable || [];
            project.laborTable.push({ ...record, id: data.id });
          }
          return data.id;
        } else {
          throw new Error(data.statusMessage || "Failed to add labor record");
        }
      } catch (error) {
        console.error("Error adding labor record:", error);
        alert("Error adding labor record: " + error.message);
        throw error;
      }
    },

    async addHarvestRecord(projectId, record) {
      try {
        // Post the new record to the API
        const response = await fetch(`${baseURL}/api/harvestRecords`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId, ...record }),
        });
        const data = await response.json();

        if (response.ok) {
          // Update the local project labor table
          const project = this.projects.find((p) => p.id === projectId);
          if (project) {
            project.harvestTable = project.harvestTable || [];
            project.harvestTable.push({ ...record, id: data.id });
          }
          return data.id;
        } else {
          throw new Error(data.statusMessage || "Failed to add harvest record");
        }
      } catch (error) {
        console.error("Error adding harvest record:", error);
        alert("Error adding harvest record: " + error.message);
        throw error;
      }
    },

    async addLandPrepRecord(projectId, record) {
      try {
        // Post the new record to the API
        const response = await fetch(`${baseURL}/api/landPrepRecords`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId, ...record }),
        });
        const data = await response.json();

        if (response.ok) {
          // Update the local project labor table
          const project = this.projects.find((p) => p.id === projectId);
          if (project) {
            project.landPrepTable = project.landPrepTable || [];
            project.landPrepTable.push({ ...record, id: data.id });
          }
          return data.id;
        } else {
          throw new Error(
            data.statusMessage || "Failed to add land prep record"
          );
        }
      } catch (error) {
        console.error("Error adding land prep record:", error);
        alert("Error adding land prep record: " + error.message);
        throw error;
      }
    },
    async addProgressPrepRecord(projectId, record, imageFile) {
      try {
        const formData = new FormData();
        formData.append("projectId", projectId);
        formData.append("date", record.date);
        formData.append("stage", record.stage);

        if (imageFile) {
          formData.append("image", imageFile);
        }

        const response = await fetch(`${baseURL}/api/progressRecords`, {
          method: "POST",
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
          throw new Error(data.error || "Failed to upload progress record");
        }
      } catch (error) {
        console.error("Error adding progress record:", error);
        alert("Error adding progress record: " + error.message);
        throw error;
      }
    },

    async updateProjectStatus(projectId, status) {
      try {
        const response = await fetch("/api/updateStatus", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ projectId, status }),
        });
        if (!response.ok) {
          throw new Error("Failed to update project status");
        }
        // Optionally, you can use the updated project data returned from the backend:
        // const updatedProject = await response.json();
        const index = this.projects.findIndex((p) => p.id === projectId);
        if (index !== -1) {
          // Update the project status locally.
          this.projects[index].status = status;
        }
      } catch (error) {
        console.error("Error updating project status:", error);
      }
    },
  },
});
