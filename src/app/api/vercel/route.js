import { NextResponse } from 'next/server';

export async function GET() {
    const token = process.env.VERCEL_TOKEN;
    const teamId = process.env.VERCEL_TEAM_ID; // Optional team ID

    if (!token) {
        return NextResponse.json(
            { error: 'Vercel configuration missing' },
            { status: 500 }
        );
    }

    try {
        // 1. Fetch projects
        const projectsUrl = new URL('https://api.vercel.com/v9/projects');
        if (teamId) projectsUrl.searchParams.append('teamId', teamId);

        const projectsRes = await fetch(projectsUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            next: { revalidate: 60 }, // Cache for 60 seconds
        });

        if (!projectsRes.ok) {
            throw new Error(`Failed to fetch projects: ${projectsRes.statusText}`);
        }

        const projectsData = await projectsRes.json();
        const projects = projectsData.projects || [];

        // 2. Fetch latest deployment for each project
        const projectsWithStatus = await Promise.all(
            projects.map(async (project) => {
                const deploymentsUrl = new URL('https://api.vercel.com/v6/deployments');
                deploymentsUrl.searchParams.append('projectId', project.id);
                deploymentsUrl.searchParams.append('limit', '1');
                if (teamId) deploymentsUrl.searchParams.append('teamId', teamId);

                try {
                    const depRes = await fetch(deploymentsUrl, {
                        headers: { Authorization: `Bearer ${token}` },
                        next: { revalidate: 60 },
                    });

                    if (!depRes.ok) return { ...project, latestDeployment: null };

                    const depData = await depRes.json();
                    const latestDeployment = depData.deployments?.[0] || null;

                    return {
                        ...project,
                        latestDeployment: latestDeployment ? {
                            id: latestDeployment.uid,
                            state: latestDeployment.state,
                            url: latestDeployment.url,
                            created: latestDeployment.created,
                            creator: latestDeployment.creator?.username || 'Unknown',
                        } : null
                    };
                } catch (error) {
                    console.error(`Error fetching deployment for ${project.name}:`, error);
                    return { ...project, latestDeployment: null };
                }
            })
        );

        return NextResponse.json({ projects: projectsWithStatus }, { status: 200 });

    } catch (error) {
        console.error('Vercel API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Vercel status' },
            { status: 500 }
        );
    }
}
