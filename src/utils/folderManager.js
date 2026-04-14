/**
 * File System Access API helpers — Section 5
 */

export async function selectProductFolder(nicheName) {
  if (!('showDirectoryPicker' in window)) {
    return { supported: false, path: null }
  }

  try {
    const dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' })
    const date = new Date().toISOString().split('T')[0]
    const slug = nicheName
      ? nicheName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      : 'dpf-run'
    const folderName = `${slug}-${date}`

    const runFolder = await dirHandle.getDirectoryHandle(folderName, { create: true })

    // Create subfolder structure per Section 5.2
    const subfolders = [
      '01-research',
      '02-brief',
      '03-products',
      '04-buyer-instructions',
      '05-thumbnails',
      '06-promo-video',
      '07-seo',
      '08-listing',
    ]
    for (const sub of subfolders) {
      await runFolder.getDirectoryHandle(sub, { create: true })
    }

    return {
      supported: true,
      path: folderName,
      handle: runFolder,
    }
  } catch (err) {
    if (err.name === 'AbortError') return { supported: true, path: null, cancelled: true }
    throw err
  }
}

export async function saveToFolder(handle, subfolder, filename, content) {
  if (!handle) {
    // Fallback: trigger download
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
    return true
  }

  try {
    const subHandle = await handle.getDirectoryHandle(subfolder, { create: true })
    const fileHandle = await subHandle.getFileHandle(filename, { create: true })
    const writable = await fileHandle.createWritable()
    await writable.write(content)
    await writable.close()
    return true
  } catch (err) {
    console.error('Save to folder failed:', err)
    return false
  }
}
