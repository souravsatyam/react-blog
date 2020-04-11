int N,NN;
scanf("%d",&N);NN=N;
int x[1000],y[1000],r[1000];
int i=0;
while (N>0)
{
scanf("%d",&x[i]);
scanf("%d",&y[i]);
scanf("%d",&r[i]);
N--;i++;
}
int k,j,l,count=0,final=0;
for( k=1;k<=1000;k++)
{
for(j=1;j<=1000;j++)
{
for (l=0;l<NN;l++)
{
if(dist(k,j,x[l],y[l])<=r[l]*r[l])
{
count++;
}
}
if(count>=2 && NN>=2)
{
final++;
}
count=0;
}
}
printf("%d",final);
return 0;
}
int dist(int a,int b,int p,int q)
{
int val;
val=(a-p)*(a-p)+(b-q)*(b-q);
return val;
}