import connectDB from "../../../lib/dbConnect";
import Complaint from "../../../models/Complaint";

export async function POST(req) {
  await connectDB();
  const data = await req.json();

  try {
    const complaint = await Complaint.create(data);
    return new Response(JSON.stringify({ success: true, complaint }), {
      status: 201,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to submit complaint" }), {
      status: 500,
    });
  }
}
