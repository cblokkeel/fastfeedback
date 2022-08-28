import { getAllFeedbackBySiteId } from "@/lib/db-admin";

export default async (req, res) => {
  const { feedbacks, error } = await getAllFeedbackBySiteId(req.query.siteId);

  error ? res.status(500).json({ error }) : res.status(200).json({ feedbacks });
};
