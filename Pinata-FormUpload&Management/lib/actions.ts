'use server';

import { pinata } from '@/lib/config';

export async function deleteImage(fileId: string) {
  try {
    await pinata.files.delete([fileId]);

    return { success: true };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Failed to Delete File',
    };
  }
}

export async function getImage() {
  const url = await pinata.gateways
    .createSignedURL({
      cid: 'bafybeifc5kmk3sseuzfjkk76f7fiubkmqbm2nps6xcrn2klxcsmypwobey',
      expires: 500,
    })
    .optimizeImage({ width: 1620, height: 880, format: 'webp', quality: 70 });

  return url;
}
