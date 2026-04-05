import getFirebaseAdmin from "../firebase";

export default defineEventHandler(async (event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  if (event.node.req.method === "OPTIONS") {
    return { message: "CORS preflight passed" };
  }

  try {
    const { firestore } = getFirebaseAdmin();
    if (!firestore) {
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to initialize Firestore",
      });
    }

    if (event.node.req.method === "POST") {
      const body = await readBody(event);
      if (!body.projectId || body.status === undefined) {
        throw createError({
          statusCode: 400,
          statusMessage: "Missing projectId or status",
        });
      }
      if (!['pin', 'end', ''].includes(body.status)) {
        throw createError({
          statusCode: 400,
          statusMessage: "Invalid status value",
        });
      }
      const projectRef = firestore.collection("projects").doc(body.projectId);
      const projectSnap = await projectRef.get();
      if (!projectSnap.exists) {
        throw createError({
          statusCode: 404,
          statusMessage: "Project not found",
        });
      }
      await projectRef.update({
        status: body.status,
      });
      const updatedProjectSnap = await projectRef.get();
      const updatedProject = { id: updatedProjectSnap.id, ...updatedProjectSnap.data() };
      return updatedProject;
    }
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed",
    });
  } catch (error) {
    console.error("Error updating project status:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Internal Server Error",
    });
  }
});