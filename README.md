**ADD:**

```bash
{
  React.version >= '18' ? children : <SSRProvider>{children}</SSRProvider>
          }
```

node_modules -> native-base -> src -> core -> NativeBaseProvider