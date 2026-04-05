import getFirebaseAdmin from "../../firebase";
import { getAuthUser } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  if (event.node.req.method === "OPTIONS") {
    return { message: "CORS preflight passed" };
  }

  await getAuthUser(event);

  try {
    const { firestore } = getFirebaseAdmin();
    if (!firestore) {
      throw createError({ statusCode: 500, statusMessage: "Failed to initialize Firestore" });
    }

    const projectId = event.context.params.id;
    if (!projectId) {
      throw createError({ statusCode: 400, statusMessage: "Missing projectId" });
    }

    if (event.node.req.method === "GET") {
      const projectRef = firestore.collection("projects").doc(projectId);
      const projectSnap = await projectRef.get();
      if (!projectSnap.exists) {
        throw createError({ statusCode: 404, statusMessage: "Project not found" });
      }
      return { id: projectSnap.id, ...projectSnap.data() };
    }

    if (event.node.req.method === "DELETE") {
      const projectRef = firestore.collection("projects").doc(projectId);
      const projectSnap = await projectRef.get();
      if (!projectSnap.exists) {
        throw createError({ statusCode: 404, statusMessage: "Project not found" });
      }
      await projectRef.delete();
      return { message: "Project deleted successfully" };
    }

    throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Internal Server Error",
    });
  }
});
