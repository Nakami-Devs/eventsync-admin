import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, Typography,
} from '@mui/material'

interface DeleteDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
}

export const DeleteDialog = ({ open, onClose, onConfirm, title }: DeleteDialogProps) => (
  <Dialog
    open={open}
    onClose={onClose}
    PaperProps={{ sx: { borderRadius: '16px', background: '#1e1c2e' } }}
  >
    <DialogTitle sx={{ color: 'white', fontWeight: 700 }}>
      Supprimer la session
    </DialogTitle>
    <DialogContent>
      <Typography sx={{ color: '#C8C8D3' }}>
        Voulez-vous supprimer{' '}
        <strong style={{ color: 'white' }}>{title}</strong> ?
        Cette action est irréversible.
      </Typography>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
      <Button
        onClick={onClose}
        sx={{ color: '#8b8fa8', borderRadius: '10px' }}
      >
        Annuler
      </Button>
      <Button
        onClick={onConfirm}
        variant="contained"
        sx={{ background: '#ef4444', borderRadius: '10px', '&:hover': { background: '#dc2626' } }}
      >
        Supprimer
      </Button>
    </DialogActions>
  </Dialog>
)
