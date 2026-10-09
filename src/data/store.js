// MaterialMatch - Central data store using localStorage
// All app state lives here — simple, readable, functional

const STORAGE_KEY = 'materialmatch_data';

const INITIAL_DATA = {
  currentUser: null,
  organizations: [
    {
      id: 'org1',
      name: 'UrbanCraft Furniture',
      type: 'Workshop',
      contact: 'Arjun Mehta',
      email: 'arjun@urbancraft.in',
      password: 'demo123',
      city: 'Ghaziabad',
      description: 'Custom furniture workshop producing high-quality wooden pieces. We generate significant wood scrap and offcuts that are clean and reusable.',
      joinedAt: '2024-01-15',
      wasteDiverted: 142,
    },
    {
      id: 'org2',
      name: 'GreenMinds NGO',
      type: 'NGO',
      contact: 'Priya Sharma',
      email: 'priya@greenminds.org',
      password: 'demo123',
      city: 'Delhi',
      description: 'Environmental NGO focused on community upcycling projects, workshops for underprivileged youth, and material reuse education.',
      joinedAt: '2024-01-20',
      wasteDiverted: 88,
    },
    {
      id: 'org3',
      name: 'EcoPrint Solutions',
      type: 'Business',
      contact: 'Vikram Nair',
      email: 'vikram@ecoprint.co',
      password: 'demo123',
      city: 'Noida',
      description: 'Sustainable printing company. We produce large quantities of cardboard offcuts and paper trim that are clean and suitable for reuse.',
      joinedAt: '2024-02-01',
      wasteDiverted: 210,
    },
    {
      id: 'org4',
      name: 'ThreadCycle Studio',
      type: 'Workshop',
      contact: 'Aisha Khan',
      email: 'aisha@threadcycle.in',
      password: 'demo123',
      city: 'Mumbai',
      description: 'Textile design studio creating sustainable fashion. We have fabric scraps, offcuts, and surplus materials from every project.',
      joinedAt: '2024-02-10',
      wasteDiverted: 65,
    },
    {
      id: 'org5',
      name: 'BuildAgain Workshop',
      type: 'Repair Group',
      contact: 'Rahul Singh',
      email: 'rahul@buildagain.org',
      password: 'demo123',
      city: 'Pune',
      description: 'Construction material reuse workshop. We collect and redistribute surplus construction materials like tiles, pipes, and structural components.',
      joinedAt: '2024-02-15',
      wasteDiverted: 320,
    },
    {
      id: 'org6',
      name: 'BeanRoute Café',
      type: 'Business',
      contact: 'Sonal Gupta',
      email: 'sonal@beanroute.in',
      password: 'demo123',
      city: 'Bengaluru',
      description: 'Specialty coffee café generating daily coffee grounds, packaging materials, and organic waste suitable for composting or gardening.',
      joinedAt: '2024-03-01',
      wasteDiverted: 45,
    },
    {
      id: 'org7',
      name: 'RePack Industries',
      type: 'Business',
      contact: 'Manish Joshi',
      email: 'manish@repack.co',
      password: 'demo123',
      city: 'Ahmedabad',
      description: 'Packaging solutions company with surplus foam, plastic containers, and industrial packaging materials ready for secondary use.',
      joinedAt: '2024-03-10',
      wasteDiverted: 178,
    },
    {
      id: 'org8',
      name: 'Community Makers Hub',
      type: 'Makerspace',
      contact: 'Deepa Iyer',
      email: 'deepa@makerchub.org',
      password: 'demo123',
      city: 'Chennai',
      description: 'Open makerspace and community workshop providing tools, materials, and space for creative and sustainable projects.',
      joinedAt: '2024-03-15',
      wasteDiverted: 93,
    },
  ],
  materials: [
    {
      id: 'mat1',
      orgId: 'org1',
      name: 'Wood Offcuts',
      category: 'Wood',
      description: 'Clean pine and teak wood offcuts from furniture production. Various sizes, smooth edges, excellent for craft projects and model making.',
      quantity: 35,
      unit: 'kg',
      condition: 'Clean / Reusable',
      availableUntil: '2025-08-30',
      city: 'Ghaziabad',
      pickupRequired: true,
      suggestedUses: 'Craft projects, furniture prototypes, student model-making, decoration, small shelving',
      image: null,
      status: 'available',
      createdAt: '2025-06-01',
    },
    {
      id: 'mat2',
      orgId: 'org3',
      name: 'Cardboard Sheets',
      category: 'Paper / Cardboard',
      description: 'Large format cardboard offcuts from print runs. Sturdy, clean, and suitable for packaging prototypes or art installations.',
      quantity: 60,
      unit: 'kg',
      condition: 'Clean / Reusable',
      availableUntil: '2025-08-15',
      city: 'Noida',
      pickupRequired: true,
      suggestedUses: 'Packaging prototypes, school projects, art installations, temporary signage',
      image: null,
      status: 'available',
      createdAt: '2025-06-02',
    },
    {
      id: 'mat3',
      orgId: 'org4',
      name: 'Fabric Scraps',
      category: 'Textile',
      description: 'Mixed cotton and linen fabric scraps from fashion projects. Vibrant colors, clean, ideal for upcycling or craft use.',
      quantity: 25,
      unit: 'kg',
      condition: 'Clean / Reusable',
      availableUntil: '2025-09-01',
      city: 'Mumbai',
      pickupRequired: false,
      suggestedUses: 'Patchwork, upcycled fashion, soft toys, insulation padding, art projects',
      image: null,
      status: 'available',
      createdAt: '2025-06-03',
    },
    {
      id: 'mat4',
      orgId: 'org6',
      name: 'Coffee Grounds',
      category: 'Organic Material',
      description: 'Fresh spent coffee grounds collected daily. Rich in nitrogen, perfect for composting or direct garden soil amendment.',
      quantity: 15,
      unit: 'kg',
      condition: 'Fresh / Organic',
      availableUntil: '2025-07-10',
      city: 'Bengaluru',
      pickupRequired: true,
      suggestedUses: 'Composting, garden fertilizer, mushroom growing substrate, natural dye',
      image: null,
      status: 'available',
      createdAt: '2025-06-04',
    },
    {
      id: 'mat5',
      orgId: 'org7',
      name: 'Plastic Containers',
      category: 'Plastic',
      description: 'Clean HDPE containers from food-grade packaging. Various sizes from 500ml to 5L. Washed and ready for reuse.',
      quantity: 200,
      unit: 'units',
      condition: 'Clean / Washed',
      availableUntil: '2025-10-01',
      city: 'Ahmedabad',
      pickupRequired: true,
      suggestedUses: 'Storage, planting pots, small parts organization, lab use',
      image: null,
      status: 'available',
      createdAt: '2025-06-05',
    },
    {
      id: 'mat6',
      orgId: 'org5',
      name: 'Reusable Tiles',
      category: 'Construction Material',
      description: 'Ceramic floor tiles removed during renovation. Most are intact and suitable for small flooring or decorative applications.',
      quantity: 80,
      unit: 'units',
      condition: 'Used / Intact',
      availableUntil: '2025-09-15',
      city: 'Pune',
      pickupRequired: true,
      suggestedUses: 'Flooring repair, mosaic art, garden pathways, DIY renovation',
      image: null,
      status: 'available',
      createdAt: '2025-06-06',
    },
    {
      id: 'mat7',
      orgId: 'org8',
      name: 'Electronic Components',
      category: 'Electronics',
      description: 'Salvaged resistors, capacitors, LEDs, and PCB modules from electronics projects. Tested and functional.',
      quantity: 3,
      unit: 'kg',
      condition: 'Tested / Functional',
      availableUntil: '2025-12-01',
      city: 'Chennai',
      pickupRequired: false,
      suggestedUses: 'Student electronics projects, prototyping, STEM education, repair',
      image: null,
      status: 'available',
      createdAt: '2025-06-07',
    },
    {
      id: 'mat8',
      orgId: 'org3',
      name: 'Paper Rolls',
      category: 'Paper / Cardboard',
      description: 'End rolls of newsprint and coated paper from press runs. 60–90cm wide, 5–15 meters each.',
      quantity: 40,
      unit: 'kg',
      condition: 'Clean / Unused',
      availableUntil: '2025-08-20',
      city: 'Noida',
      pickupRequired: true,
      suggestedUses: 'Drawing, painting, wrapping, school art supplies, printing tests',
      image: null,
      status: 'available',
      createdAt: '2025-06-08',
    },
    {
      id: 'mat9',
      orgId: 'org7',
      name: 'Packaging Foam',
      category: 'Packaging Material',
      description: 'High-density EPS foam sheets and custom-molded packaging forms. Lightly used, clean, excellent for protective packaging.',
      quantity: 50,
      unit: 'units',
      condition: 'Lightly Used',
      availableUntil: '2025-09-30',
      city: 'Ahmedabad',
      pickupRequired: true,
      suggestedUses: 'Fragile item packaging, insulation, product display props, model-making',
      image: null,
      status: 'available',
      createdAt: '2025-06-09',
    },
    {
      id: 'mat10',
      orgId: 'org4',
      name: 'Event Banners',
      category: 'Textile',
      description: 'Large format vinyl and fabric banners from recent events. Single-sided print on clean white fabric backing.',
      quantity: 12,
      unit: 'units',
      condition: 'Used / Clean',
      availableUntil: '2025-08-01',
      city: 'Mumbai',
      pickupRequired: false,
      suggestedUses: 'Tote bags, rainwear, temporary covers, upcycled accessories, shade structures',
      image: null,
      status: 'available',
      createdAt: '2025-06-10',
    },
    {
      id: 'mat11',
      orgId: 'org5',
      name: 'Metal Cuttings',
      category: 'Metal',
      description: 'Mild steel cuttings and offcuts from structural fabrication. Various profiles — flat bar, angle, tube sections.',
      quantity: 45,
      unit: 'kg',
      condition: 'Clean / Raw',
      availableUntil: '2025-10-15',
      city: 'Pune',
      pickupRequired: true,
      suggestedUses: 'Welding practice, sculpture, furniture legs, repair projects, school metalwork',
      image: null,
      status: 'available',
      createdAt: '2025-06-11',
    },
    {
      id: 'mat12',
      orgId: 'org1',
      name: 'Plywood Sheets',
      category: 'Wood',
      description: '18mm plywood offcuts and partial sheets from cabinet manufacturing. Consistent quality, no warping.',
      quantity: 20,
      unit: 'units',
      condition: 'Clean / Reusable',
      availableUntil: '2025-09-01',
      city: 'Ghaziabad',
      pickupRequired: true,
      suggestedUses: 'Shelving, furniture DIY, exhibition backdrops, flooring underlays',
      image: null,
      status: 'available',
      createdAt: '2025-06-12',
    },
  ],
  materialRequests: [
    {
      id: 'req1',
      orgId: 'org2',
      materialRequired: 'Clean Cardboard Sheets',
      category: 'Paper / Cardboard',
      quantity: 25,
      unit: 'kg',
      description: 'Need 20–30 kg clean cardboard sheets for reusable packaging prototypes for our zero-waste workshops.',
      neededBefore: '2025-08-15',
      city: 'Delhi',
      createdAt: '2025-06-10',
    },
    {
      id: 'req2',
      orgId: 'org8',
      materialRequired: 'Fabric Scraps',
      category: 'Textile',
      quantity: 10,
      unit: 'kg',
      description: 'Seeking cotton or mixed fabric scraps for community sewing workshops. All colors and patterns welcome.',
      neededBefore: '2025-09-01',
      city: 'Chennai',
      createdAt: '2025-06-11',
    },
    {
      id: 'req3',
      orgId: 'org2',
      materialRequired: 'Wood Scraps',
      category: 'Wood',
      quantity: 20,
      unit: 'kg',
      description: 'Looking for wood offcuts for youth carpentry training sessions. Small to medium sized pieces preferred.',
      neededBefore: '2025-08-30',
      city: 'Delhi',
      createdAt: '2025-06-12',
    },
  ],
  exchanges: [
    {
      id: 'exc1',
      materialId: 'mat3',
      requesterId: 'org2',
      supplierId: 'org4',
      quantity: 8,
      unit: 'kg',
      message: 'We would like these fabric scraps for our upcycled garment workshops for youth groups.',
      preferredPickup: '2025-06-20',
      status: 'completed',
      createdAt: '2025-06-13',
      completedAt: '2025-06-20',
      materialName: 'Fabric Scraps',
    },
    {
      id: 'exc2',
      materialId: 'mat2',
      requesterId: 'org8',
      supplierId: 'org3',
      quantity: 15,
      unit: 'kg',
      message: 'Our makerspace needs cardboard for a community model-building event next month.',
      preferredPickup: '2025-06-25',
      status: 'completed',
      createdAt: '2025-06-14',
      completedAt: '2025-06-25',
      materialName: 'Cardboard Sheets',
    },
    {
      id: 'exc3',
      materialId: 'mat1',
      requesterId: 'org2',
      supplierId: 'org1',
      quantity: 12,
      unit: 'kg',
      message: 'Need wood offcuts for a student sculpture exhibition we are hosting.',
      preferredPickup: '2025-07-05',
      status: 'accepted',
      createdAt: '2025-06-18',
      completedAt: null,
      materialName: 'Wood Offcuts',
    },
    {
      id: 'exc4',
      materialId: 'mat4',
      requesterId: 'org8',
      supplierId: 'org6',
      quantity: 5,
      unit: 'kg',
      message: 'Coffee grounds for our rooftop composting initiative.',
      preferredPickup: '2025-07-08',
      status: 'pending',
      createdAt: '2025-06-20',
      completedAt: null,
      materialName: 'Coffee Grounds',
    },
    {
      id: 'exc5',
      materialId: 'mat11',
      requesterId: 'org8',
      supplierId: 'org5',
      quantity: 10,
      unit: 'kg',
      message: 'Metal offcuts for student welding practice sessions.',
      preferredPickup: '2025-07-10',
      status: 'pending',
      createdAt: '2025-06-21',
      completedAt: null,
      materialName: 'Metal Cuttings',
    },
  ],
};

export function getStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  const initial = JSON.parse(JSON.stringify(INITIAL_DATA));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

export function saveStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetStore() {
  const initial = JSON.parse(JSON.stringify(INITIAL_DATA));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  return initial;
}

// Auth helpers
export function login(email, password) {
  const store = getStore();
  const org = store.organizations.find(o => o.email === email && o.password === password);
  if (!org) return null;
  store.currentUser = org.id;
  saveStore(store);
  return org;
}

export function logout() {
  const store = getStore();
  store.currentUser = null;
  saveStore(store);
}

export function getCurrentUser() {
  const store = getStore();
  if (!store.currentUser) return null;
  return store.organizations.find(o => o.id === store.currentUser) || null;
}

export function register(orgData) {
  const store = getStore();
  const existing = store.organizations.find(o => o.email === orgData.email);
  if (existing) return { error: 'Email already registered.' };
  const newOrg = {
    ...orgData,
    id: 'org' + Date.now(),
    joinedAt: new Date().toISOString().split('T')[0],
    wasteDiverted: 0,
  };
  store.organizations.push(newOrg);
  store.currentUser = newOrg.id;
  saveStore(store);
  return { org: newOrg };
}

// Material helpers
export function getMaterials() {
  return getStore().materials;
}

export function getMaterial(id) {
  return getStore().materials.find(m => m.id === id);
}

export function addMaterial(materialData) {
  const store = getStore();
  const mat = {
    ...materialData,
    id: 'mat' + Date.now(),
    status: 'available',
    createdAt: new Date().toISOString().split('T')[0],
  };
  store.materials.push(mat);
  saveStore(store);
  return mat;
}

export function getOrg(id) {
  return getStore().organizations.find(o => o.id === id);
}

export function updateOrg(id, updates) {
  const store = getStore();
  const idx = store.organizations.findIndex(o => o.id === id);
  if (idx === -1) return null;
  store.organizations[idx] = { ...store.organizations[idx], ...updates };
  if (store.currentUser === id) {
    // sync currentUser ref
  }
  saveStore(store);
  return store.organizations[idx];
}

// Exchange helpers
export function getExchanges() {
  return getStore().exchanges;
}

export function addExchange(exData) {
  const store = getStore();
  const exc = {
    ...exData,
    id: 'exc' + Date.now(),
    status: 'pending',
    createdAt: new Date().toISOString().split('T')[0],
    completedAt: null,
  };
  store.exchanges.push(exc);
  // Mark material as requested if not already
  const matIdx = store.materials.findIndex(m => m.id === exData.materialId);
  if (matIdx !== -1 && store.materials[matIdx].status === 'available') {
    store.materials[matIdx].status = 'requested';
  }
  saveStore(store);
  return exc;
}

export function updateExchangeStatus(id, status) {
  const store = getStore();
  const idx = store.exchanges.findIndex(e => e.id === id);
  if (idx === -1) return null;
  if (store.exchanges[idx].status === 'completed') return { error: 'Already completed.' };
  store.exchanges[idx].status = status;

  if (status === 'completed') {
    store.exchanges[idx].completedAt = new Date().toISOString().split('T')[0];
    // Deduct quantity from material
    const exc = store.exchanges[idx];
    const matIdx = store.materials.findIndex(m => m.id === exc.materialId);
    if (matIdx !== -1) {
      store.materials[matIdx].quantity -= exc.quantity;
      if (store.materials[matIdx].quantity <= 0) {
        store.materials[matIdx].quantity = 0;
        store.materials[matIdx].status = 'unavailable';
      } else {
        store.materials[matIdx].status = 'available';
      }
      // Update org waste diverted
      const supplierIdx = store.organizations.findIndex(o => o.id === exc.supplierId);
      if (supplierIdx !== -1) store.organizations[supplierIdx].wasteDiverted += exc.quantity;
    }
  } else if (status === 'accepted') {
    const exc = store.exchanges[idx];
    const matIdx = store.materials.findIndex(m => m.id === exc.materialId);
    if (matIdx !== -1) store.materials[matIdx].status = 'active';
  } else if (status === 'rejected') {
    const exc = store.exchanges[idx];
    const matIdx = store.materials.findIndex(m => m.id === exc.materialId);
    if (matIdx !== -1) store.materials[matIdx].status = 'available';
  }

  saveStore(store);
  return store.exchanges[idx];
}

// Material requirements helpers
export function getMaterialRequirements() {
  return getStore().materialRequests;
}

export function addMaterialRequirement(reqData) {
  const store = getStore();
  const req = {
    ...reqData,
    id: 'req' + Date.now(),
    createdAt: new Date().toISOString().split('T')[0],
  };
  store.materialRequests.push(req);
  saveStore(store);
  return req;
}

// Stats helpers
export function getSustainabilityStats() {
  const store = getStore();
  const completedExchanges = store.exchanges.filter(e => e.status === 'completed');
  const totalWaste = completedExchanges.reduce((sum, e) => sum + (e.quantity || 0), 0);
  const byCategory = {};
  completedExchanges.forEach(e => {
    const mat = store.materials.find(m => m.id === e.materialId);
    const cat = mat ? mat.category : 'Mixed / Other';
    byCategory[cat] = (byCategory[cat] || 0) + (e.quantity || 0);
  });
  const byMonth = {};
  completedExchanges.forEach(e => {
    const month = e.completedAt ? e.completedAt.substring(0, 7) : e.createdAt.substring(0, 7);
    byMonth[month] = (byMonth[month] || 0) + 1;
  });
  return {
    totalMaterialReused: totalWaste,
    wasteDiverted: totalWaste,
    successfulExchanges: completedExchanges.length,
    activeOrganizations: store.organizations.length,
    materialsListed: store.materials.length,
    byCategory,
    byMonth,
    totalExchanges: store.exchanges.length,
    pendingExchanges: store.exchanges.filter(e => e.status === 'pending').length,
  };
}

export function getOrgStats(orgId) {
  const store = getStore();
  const myMaterials = store.materials.filter(m => m.orgId === orgId);
  const incomingReqs = store.exchanges.filter(e => e.supplierId === orgId);
  const outgoingReqs = store.exchanges.filter(e => e.requesterId === orgId);
  const completed = store.exchanges.filter(e => (e.supplierId === orgId || e.requesterId === orgId) && e.status === 'completed');
  const waste = completed.reduce((sum, e) => sum + (e.quantity || 0), 0);
  return {
    activeListings: myMaterials.filter(m => m.status === 'available' || m.status === 'requested').length,
    pendingRequests: incomingReqs.filter(e => e.status === 'pending').length,
    successfulExchanges: completed.length,
    wasteDiverted: waste,
    totalMaterials: myMaterials.length,
    outgoingPending: outgoingReqs.filter(e => e.status === 'pending').length,
    materialsReceived: outgoingReqs.filter(e => e.status === 'completed').length,
  };
}
