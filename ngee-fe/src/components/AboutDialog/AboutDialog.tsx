import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core'
import { deepPurple } from '@material-ui/core/colors'

interface IAboutDialog {
  open: boolean
  onClose: () => void
}

export default ({ open, onClose }: IAboutDialog) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography
          variant="h4"
          style={{ color: deepPurple[500], textAlign: 'center' }}
        >
          NGee - projekt inżynierski
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" style={{ textAlign: 'center' }}>
          Ngee jest aplikacją webową w ramach projektu inżynierskiego dla
          kierunku automatyka i robotyka. Stworzona z myślą o gromadzeniu
          problemów i ich rozwiązań z dziedziny automatyki i robotyki zarówno na
          poziomie zawodowym jak i akademickim. Umożliwia łatwe wyszukiwanie
          postów zawierających problemy dzięki funkcji wyszukiwania. Jeżeli na
          podstawie wyszukiwania dany problem nie został znaleziony, to każdy
          zalogowany użytkownik może w prosty sposób zamieścić post dotyczący
          napotkanego problemu. Pod postami odbywa się dyskusja w formie
          komentarzy z udziałem innych użytkowników w celu znalezienia
          rozwiązania problemu będącego przedmiotem posta. Jeżeli pojawił się
          komentarz rozwiązujący dany problem, to autor posta może oznaczyć ten
          komentarz jako rozwiązanie, co w efekcie skutkuje zamknięciem
          dyskusji.
        </Typography>
        <Typography
          variant="body2"
          style={{ textAlign: 'center', paddingTop: 30 }}
        >
          Autor: Mateusz Kruk, kierunek: automatyka i robotyka
        </Typography>
      </DialogContent>
    </Dialog>
  )
}
