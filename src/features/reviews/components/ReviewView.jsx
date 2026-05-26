import { useState, useEffect, useMemo } from "react";
import { ReviewModal } from "./ReviewModal.jsx";
import { ReviewHeader } from "./ReviewHeader.jsx";
import { ReviewTabs } from "./ReviewTabs.jsx";
import { ReviewGrid } from "./ReviewGrid.jsx";
import { useReviewActions } from "../hooks/useReviewActions.js";
import { useBranchStore } from "../../users/store/adminStore.js";

export const ReviewPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [activeTab, setActiveTab] = useState("TODAS");
  const [selectedBranch, setSelectedBranch] = useState("");

  const { reviews, getReviews, saveReview, deleteReview } = useReviewActions();
  const { getBranches } = useBranchStore();

  useEffect(() => { getBranches(); }, [getBranches]);
  useEffect(() => { getReviews(selectedBranch || "all"); }, [selectedBranch, getReviews]);

  const filteredReviews = reviews.filter((r) => {
    if (activeTab === "OCULTAS") return r.isDeleted;
    if (r.isDeleted) return false;
    if (activeTab === "5 ESTRELLAS") return r.rating === 5;
    if (activeTab === "BUENAS (3-4)") return r.rating >= 3 && r.rating <= 4;
    if (activeTab === "CRÍTICAS (1-2)") return r.rating <= 2;
    return true;
  });

  const stats = useMemo(() => {
    const total = filteredReviews.length;
    const sum = filteredReviews.reduce((acc, curr) => acc + curr.rating, 0);
    const average = total > 0 ? (sum / total).toFixed(1) : "0.0";
    return { average, total };
  }, [filteredReviews]);

  return (
    <div className="space-y-6 md:space-y-8 animate-fadeIn p-2 md:p-4">
      <ReviewHeader stats={stats} />
      <ReviewTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <ReviewGrid
        reviews={filteredReviews}
        onEdit={(review) => { setSelectedReview(review); setIsModalOpen(true); }}
        onDelete={deleteReview}
      />
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reviewData={selectedReview}
        onModerate={deleteReview}
      />
    </div>
  );
};