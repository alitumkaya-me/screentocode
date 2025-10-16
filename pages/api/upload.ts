import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads')
  
  // Ensure upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
  })

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'File upload failed' })
    }

    const file = files.file
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Handle both single file and array
    const uploadedFile = Array.isArray(file) ? file[0] : file
    const oldPath = uploadedFile.filepath
    const fileName = `${Date.now()}-${uploadedFile.originalFilename || 'upload.png'}`
    const newPath = path.join(uploadDir, fileName)

    // Move file to proper location
    fs.renameSync(oldPath, newPath)

    const url = `/uploads/${fileName}`
    return res.status(200).json({ url })
  })
}
