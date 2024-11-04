import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const createDefaultProducts = async (adminUserId) => {
    // Assuming that you have already created categories and subcategories in your database
    const categories = await prisma.category.findMany();
    const subCategories = await prisma.subCategory.findMany();

    const subCategoryMap = subCategories.reduce((acc, subCategory) => {
        acc[subCategory.name] = subCategory.id;
        return acc;
    }, {});

    return [
        {
            name: 'Elektrische keuring residentieel',
            btwPercent: 21,
            price: 100,
            userId: adminUserId,
            subCategoryId: subCategoryMap['Elektrische keuring residentieel'], 
        },
        {
            name: 'Elektrische keuring extra teller',
            btwPercent: 21,
            price: 200,
            userId: adminUserId,
            subCategoryId: subCategoryMap['Elektrische keuring residentieel'], 
        },
        {
            name: 'Keuring zonnepanelen residentieel',
            btwPercent: 21,
            price: 200,
            userId: adminUserId,
            subCategoryId: subCategoryMap['Elektrische keuring residentieel'], 
        },
        {
            name: 'Keuring baterij residentieel',
            btwPercent: 21,
            price: 200,
            userId: adminUserId,
            subCategoryId: subCategoryMap['Elektrische keuring residentieel'], 
        },
        {
            name: 'Keuring laadpaal residentieel',
            btwPercent: 21,
            price: 200,
            userId: adminUserId,
            subCategoryId: subCategoryMap['Elektrische keuring residentieel'], 
        },
        {
            name: 'EPC residentieel - Vlaanderen',
            btwPercent: 21,
            price: 1299,
            userId: adminUserId,
            subCategoryId: subCategoryMap['EPC residentieel'], 
        },
        {
            name: 'EPC residentieel - Brussel',
            btwPercent: 21,
            price: 999,
            userId: adminUserId,
            subCategoryId: subCategoryMap['EPC residentieel'], 
        },
        {
            name: 'EPC gemeenschappelijke delen',
            btwPercent: 21,
            price: 999,
            userId: adminUserId,
            subCategoryId: subCategoryMap['EPC residentieel'], 
        },
        {
            name: 'Asbestattest residentieel',
            btwPercent: 21,
            price: 1299,
            userId: adminUserId,
            subCategoryId: subCategoryMap['Asbestinventaris residentieel (Asbesattest)'], 
        },
        {
            name: 'Asbestattest gemeenschappelijke delen',
            btwPercent: 21,
            price: 999,
            userId: adminUserId,
            subCategoryId: subCategoryMap['Asbestinventaris residentieel (Asbesattest)'], 
        },
    ];
};
