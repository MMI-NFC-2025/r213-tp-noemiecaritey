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