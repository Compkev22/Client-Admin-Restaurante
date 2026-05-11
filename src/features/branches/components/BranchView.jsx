// features/branches/components/BranchView.jsx
import { useEffect, useState } from "react";
import { useBranchStore } from "../../users/store/adminStore";
import { showError } from "../../../shared/utils/toast";
import { BranchHeader } from "./BranchHeader";
import { BranchGrid } from "./BranchGrid";
import { BranchModal } from "./BranchModal";

export const BranchPage = () => {
  const { branches, loading, error, getBranches } = useBranchStore();
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  useEffect(() => { getBranches(); }, [getBranches]);
  useEffect(() => { if (error) showError(error); }, [error]);

  const branchesList = branches || [];

  const handleEdit = (branch) => {
    setSelectedBranch(branch);
    setIsBranchModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedBranch(null);
    setIsBranchModalOpen(true);
  };

  const handleClose = () => {
    setIsBranchModalOpen(false);
    setSelectedBranch(null);
  };

  return (
    <div className="space-y-8 animate-fadeIn p-4">
      <BranchHeader onCreateClick={handleCreate} />
      <BranchGrid
        branches={branchesList}
        loading={loading}
        error={error}
        onEdit={handleEdit}
        onRetry={getBranches}
      />
      <BranchModal
        isOpen={isBranchModalOpen}
        onClose={handleClose}
        branch={selectedBranch}
      />
    </div>
  );
};