export const protectRoute = (c: any) => {
    const user = c.get('clerkUser');
    if (!user) {
        return c.json({ error: 'Unauthorized' }, 401);
    }
    return c.next();
}