const KEY = "oddkin.profiles.v1";

export function loadProfiles() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveProfiles(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function upsertProfile(profile) {
  const list = loadProfiles();
  const index = list.findIndex((item) => item.id === profile.id);
  if (index >= 0) list[index] = profile;
  else list.push(profile);
  saveProfiles(list);
  return profile;
}

export function findByEmail(email) {
  const needle = email.trim().toLowerCase();
  return loadProfiles().find((item) => item.email.toLowerCase() === needle) || null;
}
