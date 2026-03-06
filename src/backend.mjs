import PocketBase from "pocketbase" ;
const pb = new PocketBase('http://127.0.0.1:8090') ;
 
export async function getOffres() {
    try {
        let data = await pb.collection('maison').getFullList({
            sort: '-created',
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getImageUrl(record, recordImage) {
    return pb.files.getURL(record, recordImage);
}

//backend.js
export async function getOffre(id) {
    try {
        const data = await pb.collection('maison').getOne(id);
        
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function getOffresSupSurface(surface){
    const records = await pb.collection('maison').getFullList({ filter: `surface >= ${surface}` }) ;
    return records
}

export async function getOffresinfprix(prix){
    const records = await pb.collection('maison').getFullList({ filter: `prix <= ${prix}` }) ;
    return records
}


export async function addOffre(house) {
    try {
        await db.collection('maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}


export async function addEvent(data) {
    try {
        await pb.collection("maison").create(data);
        return {
            success: true,
            message: "L'événement a été ajouté avec succès.",
        };
    } catch (error) {
        return {
            success: false,
            message: "Une erreur est survenue lors de l'ajout de l'événement : " + error,
        };
    }
}

export async function filterByPrix(minPrix, maxPrix) {
    const records = await pb.collection('maison').getFullList({ filter: `prix >= ${minPrix} && prix <= ${maxPrix}` }) ;
    return records
}

export async function getAgentById(id) {
    try {
        const agent = await pb.collection('agent').getOne(id);
        return agent;
    } catch (error) {
        console.log('Une erreur est survenue en récupérant l\'agent', error);
        return null;
    }
}
export async function getAllAgents() {
    try {
        const agent = await pb.collection('agent').getFullList();
        return agent;
    } catch (error) {
        console.log('Une erreur est survenue en récupérant les agents', error);
        return null;
    }
}

export async function getOffresByAgent(id) {
    const records = await pb.collection('maison').getFullList({ filter: `agent = "${id}"` }) ;
    return records
}

export async function setFavori(offre) {
    await db.collection('offres').update(offre.id, { 
        favori: !offre.favori 
    });
}