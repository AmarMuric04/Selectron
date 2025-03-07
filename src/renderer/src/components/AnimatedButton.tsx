import { Button } from '@mui/material'
import React, { useState } from 'react'

const AnimatedButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <Button
      variant="contained"
      color="secondary"
      sx={{
        bgcolor: 'purple.700',
        textTransform: 'none',
        px: 4,
        py: 1,
        borderRadius: hovered ? '32px' : '0px',
        transition: 'all 0.3s',
        '&:hover': {
          borderRadius: '32px',
          bgcolor: 'purple.800'
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Button>
  )
}

export default AnimatedButton
