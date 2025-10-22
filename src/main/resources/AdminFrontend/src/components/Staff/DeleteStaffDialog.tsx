import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle, Loader2 } from "lucide-react";

interface DeleteStaffDialogProps {
  isOpen: boolean;
  onClose: () => void;
  staff: any;
  onStaffDeleted: (staffId: number) => void;
}

export default function DeleteStaffDialog({ isOpen, onClose, staff, onStaffDeleted }: DeleteStaffDialogProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:8082/admin/delete/${staff.staffID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onStaffDeleted(staff.staffID);
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to delete staff member');
      }
    } catch (error) {
      console.error('Error deleting staff:', error);
      setError('Failed to delete staff member. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Remove Staff Access
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to remove <strong>{staff?.fullName}</strong>'s access? 
            This action cannot be undone and will permanently delete their account.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Staff Details:</h4>
            <div className="text-sm space-y-1 text-muted-foreground">
              <p><strong>Name:</strong> {staff?.fullName}</p>
              <p><strong>Role:</strong> {staff?.role}</p>
              <p><strong>Department:</strong> {staff?.department}</p>
              <p><strong>Email:</strong> {staff?.email}</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={handleDelete}
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Remove Access
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
